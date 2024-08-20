import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PreferenceQuestionnaireFormFields, Workout } from '../../types';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { PreferencesListFieldForm } from '../PreferencesListFieldForm';

export const WorkoutsForm: React.FC = () => {
  const { control } = useFormContext<PreferenceQuestionnaireFormFields>();
  const { append, remove, fields } = useFieldArray({
    control,
    name: PreferenceQuestionnaireFieldsNames.WORKOUTS,
  });

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
    />
  );
};
