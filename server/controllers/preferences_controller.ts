import type { Response, Request } from 'express';
import { query } from '../dal/data_access';

const saveUserPreferences = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId;
        const preferences = req.body.preferences;
        const userPersonalDataParams = [
            preferences.gender,
            preferences.age,
            preferences.height,
            preferences.weight,
            preferences.activityLevel,
            userId,
        ];

        //1. save user personal data in user table
        await query(
            'UPDATE "trAIn".users SET gender = $1, age = $2, height = $3, weight = $4, activity_level = $5, filled_preferences = true WHERE user_id = $6',
            userPersonalDataParams
        );

        const userGoalsParams = [
            userId,
            preferences.targetWeight,
            preferences.goals,
            preferences.days,
            preferences.workouts,
            preferences.durationInMinutes,
        ];

        //2. save user goals in goals table
        await query(
            'INSERT INTO "trAIn".goals (user_id, target_weight, goals, days, workouts, workout_duration_in_minutes) VALUES ($1, $2, $3, $4, $5, $6)',
            userGoalsParams
        );

        const results = await query('SELECT * FROM "trAIn".users WHERE user_id = $1', [userId]);
        return res.status(201).sendStatus(results[0]);
    } catch (error) {
        res.status(400).send('An error occurred while saving user preferences');
    }
};

export default { saveUserPreferences };
