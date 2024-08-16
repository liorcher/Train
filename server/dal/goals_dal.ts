import { query } from './data_access';

export const saveGoals = async (preferences, userId: string) => {
    const userGoalsParams = [
        userId,
        preferences.targetWeight,
        preferences.goals,
        preferences.days,
        preferences.workouts,
        preferences.durationInMinutes,
    ];

    await query(
        'INSERT INTO "trAIn".goals (user_id, target_weight, goals, days, workouts, workout_duration_in_minutes) VALUES ($1, $2, $3, $4, $5, $6)',
        userGoalsParams
    );
}

export const getGoalsByUser = async (userId: string) => {
    const result = await query(
        'SELECT * FROM "trAIn".goals WHERE user_id = $1',
        [userId]
    );
}