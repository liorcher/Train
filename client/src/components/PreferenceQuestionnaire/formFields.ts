import { PreferencesMetaData } from '@/models';
import {
  ActivityLevel,
  Day,
  Gender,
  Goal,
  PreferenceQuestionnaireFormFields,
  Workout,
} from './types';

export enum PreferenceQuestionnaireFieldsNames {
  GENDER = 'gender',
  AGE = 'age',
  WEIGHT = 'weight',
  TARGET_WEIGHT = 'targetWeight',
  HEIGHT = 'height',
  ACTIVITY_LEVEL = 'activityLevel',
  GOALS = 'goals',
  DAYS = 'days',
  WORKOUTS = 'workouts',
  WORKOUT_DURATION_IN_MINUTES = 'workoutDurationInMinutes',
  WORKOUT_TIME = 'workoutTime',
}

export const ListFieldOptionByType = {
  [PreferenceQuestionnaireFieldsNames.GOALS]: Goal,
  [PreferenceQuestionnaireFieldsNames.DAYS]: Day,
  [PreferenceQuestionnaireFieldsNames.WORKOUTS]: Workout,
};

export const availableWorkoutsByGoal: Record<Goal, Workout[]> = {
  [Goal.BUILD_MUSCLE]: [Workout.STRENGTH_WORKOUT],
  [Goal.LOSE_WEIGHT]: [Workout.WALK, Workout.RUN, Workout.CYCLING, Workout.SWIMMING],
  [Goal.MAINTAIN_WEIGHT]: [Workout.WALK, Workout.RUN, Workout.CYCLING, Workout.SWIMMING],
  [Goal.TONE_BODY]: [Workout.YOGA],
  [Goal.IMPROVE_FITNESS]: [Workout.WALK, Workout.RUN, Workout.CYCLING, Workout.SWIMMING],
  [Goal.INCREASE_STRENGTH]: [Workout.STRENGTH_WORKOUT],
};

export const getFormDefaultValues = (): PreferenceQuestionnaireFormFields => ({
  [PreferenceQuestionnaireFieldsNames.GENDER]: Gender.MALE,
  [PreferenceQuestionnaireFieldsNames.AGE]: 0,
  [PreferenceQuestionnaireFieldsNames.WEIGHT]: 0,
  [PreferenceQuestionnaireFieldsNames.TARGET_WEIGHT]: 0,
  [PreferenceQuestionnaireFieldsNames.HEIGHT]: 0,
  [PreferenceQuestionnaireFieldsNames.ACTIVITY_LEVEL]: ActivityLevel.BEGINNER,
  [PreferenceQuestionnaireFieldsNames.GOALS]: [],
  [PreferenceQuestionnaireFieldsNames.DAYS]: [],
  [PreferenceQuestionnaireFieldsNames.WORKOUTS]: [],
  [PreferenceQuestionnaireFieldsNames.WORKOUT_DURATION_IN_MINUTES]: 0,
  [PreferenceQuestionnaireFieldsNames.WORKOUT_TIME]: '',
});

export const convertPreferencesToFormFields = (
  preferences: PreferencesMetaData
): PreferenceQuestionnaireFormFields => ({
  ...preferences,
  gender: preferences.gender as Gender,
  activityLevel: preferences.activityLevel as ActivityLevel,
  goals: preferences.goals.map((goal) => ({ goal: goal as Goal })),
  days: preferences.days.map((day) => ({ day: day as Day })),
  workouts: preferences.workouts.map((workout) => ({ workout: workout as Workout })),
});

export const convertFormValuesToApi = (
  values: PreferenceQuestionnaireFormFields
): PreferencesMetaData => ({
  ...values,
  goals: values.goals.map((goal) => goal['goal']),
  days: values.days.map((day) => day['day']),
  workouts: values.workouts.map((workout) => workout['workout']),
});
