import type { Response, Request } from 'express';
import { updatePreferencesByUser, getUser } from '../dal/users_dal';
import { getGoalsByUser, saveGoals } from '../dal/goals_dal';

const getUserPreferences = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId;
        const user = await getGoalsByUser(userId);
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).send('An error occurred while fetching user preferences');
    }
};

const saveUserPreferences = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId;
        const preferences = req.body.preferences;

        await updatePreferencesByUser(preferences, userId);
        await saveGoals(preferences, userId);

        const user = await getUser(userId);
        return res.status(201).json(user);
    } catch (error) {
        res.status(400).send('An error occurred while saving user preferences');
    }
};

export default { getUserPreferences, saveUserPreferences };
