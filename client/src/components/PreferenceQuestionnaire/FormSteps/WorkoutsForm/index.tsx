import { useCallback } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { PreferenceQuestionnaireFormFields, Workout } from '../../types';
import { availableWorkoutsByGoal, PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { PreferencesListFieldForm } from '../PreferencesListFieldForm';

export const WorkoutsForm: React.FC = () => {
  const { control } = useFormContext<PreferenceQuestionnaireFormFields>();
  const { append, remove, fields } = useFieldArray({
    control,
    name: PreferenceQuestionnaireFieldsNames.WORKOUTS,
  });

  const goals = useWatch({ control, name: PreferenceQuestionnaireFieldsNames.GOALS });

  const getAvailableWorkouts = useCallback(() => {
    const availableWorkoutsSet = new Set<string>();

    goals.forEach((goal) => {
      const workouts = availableWorkoutsByGoal[goal.goal];
      workouts.forEach((workout) => availableWorkoutsSet.add(workout));
    });

    return Array.from(availableWorkoutsSet);
  }, [goals]);

  const isWorkoutSelected = useCallback(
    (workout: string) => !!fields.find((field) => field.workout === workout),
    [fields]
  );

  const onWorkoutChange = useCallback(
    (value: string) => {
      if (isWorkoutSelected(value)) {
        remove(fields.findIndex((field) => field.workout === value));
      } else {
        if (fields.length < 3) {
          append({ workout: value as Workout });
        }
      }
    },
    [fields, isWorkoutSelected, append, remove]
  );

  return (
    <PreferencesListFieldForm
      title={'What are your favorite workouts? Select 1 up to 3'}
      fieldName={PreferenceQuestionnaireFieldsNames.WORKOUTS}
      isItemSelected={isWorkoutSelected}
      onItemClick={onWorkoutChange}
      options={getAvailableWorkouts()}
    />
  );
};
