import { User, UserGoals } from '@/models';
import { pick } from 'lodash';

export const getAllUserPreferences = (user: User, goals: UserGoals) => ({
  ...goals,
  ...pick(user, ['age', 'gender', 'height', 'weight', 'activityLevel']),
});
