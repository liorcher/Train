import type { Response, Request } from 'express';
import {getExercisesByUser}  from '../dal/exercises_dal'

const getUserExercises = async (req: Request, res: Response) => {
    try {
        const results = await getExercisesByUser(req.user.userId);
        if (results.length) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).send('Exercises for current user not found');
        }
    } catch (error) {
        res.status(400).send('An error occurred while fetching exercises');
    }
};

const createUserWorkoutPlan = async (req: Request, res: Response) => {

}

export default { getUserExercises };
