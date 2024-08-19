import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import type { Response, Request } from 'express';
import { getTokenFromRequest } from '../utils/auth_util';
import { insertUser, getUsersByEmail, getUser, setUserToken } from '../dal/users_dal';
import { User } from '../models/user';

export const register = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (email === undefined || password === undefined) {
        return res.status(400).send('email and password are missing');
    }

    try {
        const users = await getUsersByEmail(email);

        if (users.length) {
            return res.status(400).send('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await insertUser(email, hashedPassword, name);

        //generate the tokens after register success
        const tokens = await generateTokens(newUser);
        if (tokens == null) return res.status(400).send('An error occurred while logging in');

        return res.status(200).send({ ...newUser, tokens });
    } catch (error) {
        return res.status(400).send('An error occurred while registering');
    }
};

const updateUserRefreshTokens = async (userId: string, refreshToken: string): Promise<User | null> => {
    try {
        const user = await getUser(userId);

        if (user == null) return null;

        if (!user.tokens.includes(refreshToken)) {
            user.tokens = [];
            await setUserToken(user.tokens, userId);
            return null;
        }

        user.tokens = user.tokens.filter((token) => token !== refreshToken);
        await setUserToken(user.tokens, userId);
        return user;
    } catch (error) {
        return null;
    }
};

const generateTokens = async (user: User): Promise<{ accessToken: string; refreshToken: string } | null> => {
    const accessToken = jwt.sign({ userId: user.userId }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    });

    const refreshTokenRandom = Math.floor(Math.random() * 1000000).toString();
    const refreshToken = jwt.sign({ userId: user.userId, random: refreshTokenRandom }, process.env.TOKEN_SECRET, {});

    if (user.tokens == null) user.tokens = [];
    user.tokens = [...user.tokens, refreshToken];

    try {
        await setUserToken(user.tokens, user.userId);

        return { accessToken, refreshToken };
    } catch (error) {
        throw null;
    }
};

export const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email === undefined || password === undefined) return res.status(404).send('email and password are missing');

    try {
        //Check if the user exists
        const results = await getUsersByEmail(email);
        const user: User = results[0];
        // const user = await UserModel.findOne({ email });
        if (user === null) return res.status(404).send('User not found');

        //Compare the password
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return res.status(400).send('Invalid credentials');

        const tokens = await generateTokens(user);

        if (tokens == null) return res.status(400).send('An error occurred while logging in');

        return res.status(200).send(tokens);
    } catch (error) {
        return res.status(400).send('An error occurred while logging in');
    }
};

export const refresh = async (req: Request, res: Response) => {
    const refreshToken = getTokenFromRequest(req);

    if (refreshToken == null) return res.sendStatus(401);

    try {
        jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (error, data: JwtPayload) => {
            const { userId } = data;

            if (error) return res.sendStatus(403);

            const user = await updateUserRefreshTokens(userId, refreshToken);

            if (user == null) return res.sendStatus(403);

            const tokens = await generateTokens(user);

            if (tokens == null) return res.sendStatus(400);
            return res.status(200).send(tokens);
        });
    } catch (error) {
        return res.sendStatus(400);
    }
};

export const logout = async (req: Request, res: Response) => {
    const refreshToken = getTokenFromRequest(req);

    if (refreshToken == null) return res.sendStatus(401);

    try {
        jwt.verify(refreshToken, process.env.TOKEN_SECRET, async (error, data: JwtPayload) => {
            const { userId } = data;

            if (error) return res.sendStatus(403);
            const user = await updateUserRefreshTokens(userId, refreshToken);
            if (user === null) return res.sendStatus(403);

            return res.sendStatus(200);
        });
    } catch (error) {
        return res.status(400).send(`an error occured during logout, error: ${error}`);
    }
};

export default { register, login, refresh, logout };
