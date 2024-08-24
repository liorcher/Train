import { query } from './data_access';
import { Workout } from '../models/workout';

export const getWorkoutsByUser = async (userId: string) => {
    const results: Workout[] = await query(`
        SELECT * 
        FROM "trAIn".workouts 
        WHERE user_id = $1 AND NOT is_deleted
        ORDER BY date asc`, [
        userId,
    ]);

    return results;
};

export const saveWorkout = async (workout: Workout) => {
    const results = await query(
        `INSERT INTO "trAIn".workouts(
	user_id, exercises, date, title, duration)
	VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
        [workout.userId, workout.exercises, workout.date, workout.title, workout.duration]
    );

    return results;
};
