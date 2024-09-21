import type { Response, Request } from 'express';
import { getWorkoutsByUser, saveWorkout, updateWorkoutById, deleteWorkoutsByUser } from '../dal/workouts_dal';
import axios from 'axios';
import { getUser } from '../dal/users_dal';
import { getGoalsByUser } from '../dal/goals_dal';
import { Workout } from '../models/workout';
import { scheduleWorkouts } from '../utils/workout_util';

const API_WORKOUT_PLAN_URL = `${process.env.PROMPT_SERVICE_URL}/api/v1/workout/plan`;

const getUserWorkouts = async (req: Request, res: Response) => {
    try {
        const results = await getWorkoutsByUser(req.user.userId);
        if (results.length) {
            res.status(200).json(results);
        } else {
            res.status(404).send('Workouts for current user not found');
        }
    } catch (error) {
        res.status(400).send('An error occurred while fetching Workouts');
    }
};

const createUserWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const numberOfWorkoutAhead: number = Number(process.env.NUMBER_OF_WORKOUTS_AHEAD) || 30;
        const userId = req.user.userId;

        const user = await getUser(userId);
        const goals = await getGoalsByUser(userId);

        const preferences = { ...user, ...goals };
        const response = await axios.post(API_WORKOUT_PLAN_URL, preferences);

        const scheduledWorkouts = scheduleWorkouts(
            goals.days,
            response.data.json.workouts,
            numberOfWorkoutAhead,
            goals.workoutTime
        );

        await deleteWorkoutsByUser(userId);

        const workouts = await Promise.all(
            scheduledWorkouts.map(async (workout: Workout) => {
                workout.userId = userId;
                const results = await saveWorkout(workout);
                return results[0];
            })
        );

        res.status(200).send(workouts);
    } catch (error) {
        console.log(error);
        res.status(400).send('An error occurred while create user workout plan');
    }
};

const updateWorkoutProgress = async (req: Request, res: Response) => {
    try {
        const workoutId = req.body.id;
        const updatedData = req.body;

        const isDone = updatedData.isDone;
        const caloriesBurned = updatedData.caloriesBurned;

        const updatedWorkout = await updateWorkoutById(workoutId, isDone, caloriesBurned);

        if (!updatedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        return res.json(updatedWorkout);
    } catch (error) {
        console.error('Error updating workout:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default { getUserWorkouts, createUserWorkoutPlan, updateWorkoutProgress };
