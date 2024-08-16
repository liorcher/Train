import type { Response, Request } from 'express';
import { getUser } from '../dal/users_dal';
import { getGoalsByUser } from '../dal/goals_dal';

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const result = getUser(req.user.userId);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send('An error occurred while fetching user');
    }
};



export const createUserWorkoutPlan = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId
        const user = getUser(userId);
        const goals = getGoalsByUser(userId)
        const preferences = {...user, ...goals}
        //TODO: call gpt with preferences
    } catch (error) {
        res.status(400).send('An error occurred while create user workout plan');
    }
};
