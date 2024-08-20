import { useCallback } from 'react';
import { PreferencesListFieldForm } from '../PreferencesListFieldForm';
import { Day, PreferenceQuestionnaireFormFields } from '../../types';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { useFieldArray, useFormContext } from 'react-hook-form';

export const DaysForm: React.FC = () => {
  const { control } = useFormContext<PreferenceQuestionnaireFormFields>();
  const { append, remove, fields } = useFieldArray({
    control,
    name: PreferenceQuestionnaireFieldsNames.DAYS,
  });

  const isDaySelected = useCallback(
    (day: string) => !!fields.find((field) => field.day === day),
    [fields]
  );

  const onDayChange = useCallback(
    (value: string) => {
      if (isDaySelected(value)) {
        remove(fields.findIndex((field) => field.day === value));
      } else {
        append({ day: value as Day });
      }
    },
    [fields, isDaySelected, append, remove]
  );

  return (
    <PreferencesListFieldForm
      title={'Select 1 up to 3 of your prefered workout days?'}
      fieldName={PreferenceQuestionnaireFieldsNames.DAYS}
      isItemSelected={isDaySelected}
      onItemClick={onDayChange}
    />
  );
};
