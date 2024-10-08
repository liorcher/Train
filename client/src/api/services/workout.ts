import { Workout } from '@/models';
import Api from '../api';

const WORKOUT_PATH_URL = '/workout';

class WorkoutApi {
  async getUserWorkouts(): Promise<Workout[]> {
    const res = await Api.get(`${WORKOUT_PATH_URL}/currentUser`);
    const parsedData = res.data.map((workout: { exercises: string }) => ({
      ...workout,
    })) as Workout[];

    return parsedData;
  }

  async createWorkoutPlan(): Promise<Workout[]> {
    const res = await Api.post(`${WORKOUT_PATH_URL}/newWorkoutPlan`);
    const parsedData = res.data.map((workout: { exercises: string }) => ({
      ...workout,
    })) as Workout[];

    return parsedData;
  }

  async updateWorkoutProgress(workout: Workout): Promise<Workout> {
    const res = await Api.put(`${WORKOUT_PATH_URL}/${workout.id}`, workout);
    return res.data;
  }
}

export default new WorkoutApi();
