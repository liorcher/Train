import { query } from './data_access';

export const saveGoals = async (preferences, userId: string) => {
    const userGoalsParams = [
        userId,
        preferences.targetWeight,
        preferences.goals,
        preferences.days,
        preferences.workouts,
        preferences.workoutDurationInMinutes,
        preferences.workoutTime,
    ];

    await query(
        `
        INSERT INTO "trAIn".goals (user_id, target_weight, goals, days, workouts, workout_duration_in_minutes, workout_time) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (user_id) DO UPDATE 
        SET target_weight = $2, goals = $3, days = $4, workouts = $5, workout_duration_in_minutes = $6, workout_time = $7
        `,
        userGoalsParams
    );
};

export const getGoalsByUser = async (userId: string) => {
    const result = await query('SELECT * FROM "trAIn".goals WHERE user_id = $1 AND NOT is_deleted', [userId]);
    return result[0];
};
