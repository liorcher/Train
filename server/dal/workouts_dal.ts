import { query as runQuery } from './data_access';
import { Workout } from '../models/workout';

export const getWorkoutsByUser = async (userId: string) => {
    const results: Workout[] = await runQuery(
        `
        SELECT * 
        FROM "trAIn".workouts 
        WHERE user_id = $1 AND NOT is_deleted
        ORDER BY date asc`,
        [userId]
    );

    return results;
};

export const saveWorkout = async (workout: Workout) => {
    const results = await runQuery(
        `INSERT INTO "trAIn".workouts(
	user_id, exercises, date, title, duration)
	VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
        [workout.userId, workout.exercises, workout.date, workout.title, workout.duration]
    );

    return results;
};

export const updateWorkoutById = async (workoutId: string, isDone: any, caloriesBurned: any) => {
    const sqlQuery = `
        UPDATE "trAIn".workouts 
        SET 
            is_done = $1,
            calories_burned = $2
        WHERE id = $3 
        RETURNING *`;

    const values = [isDone, caloriesBurned, workoutId];

    const results = await runQuery(sqlQuery, values);

    return results;
};
