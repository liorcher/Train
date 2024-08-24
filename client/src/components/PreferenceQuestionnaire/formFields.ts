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
}

export const ListFieldOptionByType = {
  [PreferenceQuestionnaireFieldsNames.GOALS]: Goal,
  [PreferenceQuestionnaireFieldsNames.DAYS]: Day,
  [PreferenceQuestionnaireFieldsNames.WORKOUTS]: Workout,
};

export const availableWorkoutsByGoal = {
  [Goal.LOSE_WEIGHT]: [Workout.WALK, Workout.RUN, Workout.CYCLING, Workout.SWIMMING],
  [Goal.MAINTAIN_WEIGHT]: [Workout.WALK, Workout.RUN, Workout.CYCLING, Workout.SWIMMING],
  [Goal.GAIN_MUSCLE]: [Workout.STRENGTH_WORKOUT],
  [Goal.BUILD_MUSCLE]: [Workout.STRENGTH_WORKOUT],
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
});

export const convertFormValuesToApi = (
  values: PreferenceQuestionnaireFormFields
): PreferencesMetaData => ({
  ...values,
  goals: values.goals.map((goal) => goal['goal']),
  days: values.days.map((day) => day['day']),
  workouts: values.workouts.map((workout) => workout['workout']),
});
