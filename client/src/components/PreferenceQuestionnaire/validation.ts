import * as yup from 'yup';
import {
  ActivityLevel,
  Day,
  Gender,
  Goal,
  PreferenceQuestionnaireFormFields,
  Workout,
} from './types';
import dictionary from '@/dictionary';

const {
  preferencesQuestionnaire: {
    validations: {
      missingAge,
      missingWeight,
      missingHeight,
      missingActivityLevel,
      missingGoals,
      missingDays,
      missingWorkouts,
      missingDuration,
      missingWorkoutTime,
    },
  },
} = dictionary;

const timeRegex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;

export const validationSchema: yup.ObjectSchema<PreferenceQuestionnaireFormFields> = yup
  .object<PreferenceQuestionnaireFormFields>()
  .shape({
    gender: yup.mixed<Gender>().oneOf(Object.values(Gender)).required(),
    age: yup.number().min(1).max(120).required(missingAge),
    weight: yup.number().min(1).max(500).required(missingWeight),
    height: yup.number().min(50).max(250).required(missingHeight),
    targetWeight: yup.number().min(1).max(500),
    activityLevel: yup
      .mixed<ActivityLevel>()
      .oneOf(Object.values(ActivityLevel))
      .required(missingActivityLevel),
    goals: yup
      .array()
      .of(yup.object().shape({ goal: yup.mixed<Goal>().oneOf(Object.values(Goal)).required() }))
      .min(1)
      .max(3)
      .required(missingGoals),
    days: yup
      .array()
      .of(yup.object().shape({ day: yup.mixed<Day>().oneOf(Object.values(Day)).required() }))
      .min(1)
      .max(7)
      .required(missingDays),
    workouts: yup
      .array()
      .of(
        yup
          .object()
          .shape({ workout: yup.mixed<Workout>().oneOf(Object.values(Workout)).required() })
      )
      .min(1)
      .max(3)
      .required(missingWorkouts),
    workoutDurationInMinutes: yup.number().min(30).max(180).required(missingDuration),
    workoutTime: yup.string().matches(timeRegex).required(missingWorkoutTime),
  });
