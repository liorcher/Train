import { Workout } from '@/models';
import dayjs from 'dayjs';

export const getWeeklyWorkoutPlan = (workouts: Workout[]) =>
  workouts.filter((workout) => {
    const workoutDate = dayjs(workout.date);
    const startOfWeek = dayjs().startOf('week');
    const endOfWeek = dayjs().endOf('week');
    return workoutDate.isAfter(startOfWeek) && workoutDate.isBefore(endOfWeek);
  });
