import { useCallback, useMemo } from 'react';
import Loader from '@/components/Loader';
import { useAuth, usePersonalizedTrainingPlanContext, usePreferencesContext } from '@/contexts';
import { Chart } from '@/types/chart.type';
import { getBaseCaloriesPerWorkout, getWeeklyWorkoutPlan } from '@/utils';
import { ActivityLevel } from '@/components/PreferenceQuestionnaire/types';
import ProgressCharts from '@/components/ProgressCharts/ProgressCharts';

export const WeeklyProgressCharts = () => {
  const { currentUser } = useAuth();
  const { preferences } = usePreferencesContext();
  const { workouts } = usePersonalizedTrainingPlanContext();

  const weeklyWorkoutPlan = useMemo(() => getWeeklyWorkoutPlan(workouts), [workouts]);

  const getWeeklyCaloriesBurned = useCallback(() => {
    return weeklyWorkoutPlan.reduce((acc, workout) => acc + (workout.caloriesBurned ?? 0), 0);
  }, [weeklyWorkoutPlan]);

  if (!currentUser || !preferences) return <Loader />;

  const baseCaloriesPerWorkout = getBaseCaloriesPerWorkout(
    currentUser.activityLevel as ActivityLevel
  );

  const charts: Chart[] = [
    {
      title: 'Burnt Calories',
      data: Math.floor(
        (getWeeklyCaloriesBurned() / (baseCaloriesPerWorkout * weeklyWorkoutPlan.length)) * 100
      ),
      isPrecentage: true,
    },
    {
      title: 'Workouts',
      data: Math.round(
        (weeklyWorkoutPlan.filter((workout) => workout.isDone).length / weeklyWorkoutPlan.length) *
          100
      ),
      isPrecentage: true,
    },
  ];

  return <ProgressCharts charts={charts} />;
};
