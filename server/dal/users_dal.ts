import { User } from '../models/user';
import { query } from './data_access';

export const updatePreferencesByUser = async (preferences, userId: string) => {
    const userPersonalDataParams = [
        preferences.gender,
        preferences.age,
        preferences.height,
        preferences.weight,
        preferences.activityLevel,
        userId,
    ];

    await query(
        'UPDATE "trAIn".users SET gender = $1, age = $2, height = $3, weight = $4, activity_level = $5, filled_preferences = true WHERE user_id = $6',
        userPersonalDataParams
    );
};

export const getUser = async (userId: string) => {
    const results = await query('SELECT * FROM "trAIn".users WHERE user_id = $1', [userId]);
    const user: User = results[0];

    return user;
};

export const setUserToken = async (tokens, userId: string) => {
    const results = await query('UPDATE "trAIn".users SET tokens = $1 WHERE user_id = $2', [tokens, userId]);

    return results;
};

export const getUsersByEmail = async (email: string) => {
    const results = await query('SELECT * FROM "trAIn".users WHERE email = $1', [email]);

    return results;
};

export const insertUser = async (email, hashedPassword, name) => {
    const results = await query('INSERT INTO "trAIn".users (email, password, name) VALUES ($1, $2, $3) RETURNING *', [
        email,
        hashedPassword,
        name,
    ]);
    const newUser: User = results[0];
    return newUser;
};

export const updateUserWeightProgress = async (userId: string, weight: number) => {
    await query(
        `UPDATE "trAIn".users 
         SET    weights_progress = array_append(weights_progress, $1)
         WHERE   user_id = $2
        `,
        [weight, userId]
    );
};
