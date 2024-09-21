import type { Response, Request } from 'express';
import { getUser, updateUserWeightProgress } from '../dal/users_dal';

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const result = await getUser(req.user.userId);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send('An error occurred while fetching user');
    }
};

const updateUserWeight = async (req: Request, res: Response) => {
    try {
        await updateUserWeightProgress(req.user.userId, req.body.weight);
        res.status(200).send('Weight updated successfully');
    } catch (error) {
        res.status(400).send('An error occurred while updating weight');
    }
};

export default { getCurrentUser, updateUserWeight };
