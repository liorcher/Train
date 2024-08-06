import { PreferencesMetaData, User, UserGoals } from '@/models';
import Api from '../api';

const PREFERENCES_PATH_URL = '/preferences';

class PreferencesApi {
  async getUserPreferences(): Promise<UserGoals> {
    const res = await Api.get(PREFERENCES_PATH_URL);
    return res.data;
  }

  async saveUserPreferences(preferences: PreferencesMetaData): Promise<User> {
    const res = await Api.post(PREFERENCES_PATH_URL, { preferences });
    return res.data;
  }

  async updateUserPreferences() {}
}

export default new PreferencesApi();
