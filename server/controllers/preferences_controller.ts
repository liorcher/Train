import type { Response, Request } from 'express';
import { updatePreferencesByUser, getUser } from '../dal/users_dal';
import { saveGoals } from '../dal/goals_dal';

const saveUserPreferences = async (req: Request, res: Response) => {
    try {
        const userId = req.user.userId;
        const preferences = req.body.preferences;
        
        await updatePreferencesByUser(preferences, userId)
        await saveGoals(preferences, userId);

        return res.status(201);
    } catch (error) {
        res.status(400).send('An error occurred while saving user preferences');
    }
};

export default { saveUserPreferences };
