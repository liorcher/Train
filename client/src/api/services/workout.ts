import Api from '../api';

const WORKOUT_PATH_URL = '/workout';

class WorkoutApi {
  async getWorkoutsByUserId(userId: string) {
    const res = await Api.get(`${WORKOUT_PATH_URL}/${userId}`);
    return res.data;
  }
}

export default new WorkoutApi();
