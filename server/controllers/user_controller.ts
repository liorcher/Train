import type { Response, Request } from 'express';
import { query } from '../dal/data_access';

const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const results = await query('SELECT * FROM "trAIn".users WHERE user_id = $1', [req.user.userId]);
        if (results.length) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send('An error occurred while fetching user');
    }
};

export default { getCurrentUser };
