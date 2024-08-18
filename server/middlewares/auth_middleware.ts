import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { getTokenFromRequest } from '../utils/auth_util';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromRequest(req);

    //unauthorized
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (error, data: JwtPayload) => {
        //invalid request
        if (error) return res.sendStatus(403);

        const userId = data.userId;
        req.user = { userId };
        return next();
    });
};
