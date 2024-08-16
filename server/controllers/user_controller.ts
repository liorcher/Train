import type { Response, Request } from 'express';
import { getUser } from '../dal/users_dal';

const getCurrentUser = async (req: Request, res: Response) => {
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

export default { getCurrentUser };
