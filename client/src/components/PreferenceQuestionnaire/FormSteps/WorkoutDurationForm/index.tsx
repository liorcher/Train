import { Grid } from '@mui/material';
import style, { FormTextField } from '../style';
import { useFormContext } from 'react-hook-form';
import { PreferenceQuestionnaireFormFields } from '../../types';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { PreferenceFieldForm } from '../PreferenceFieldForm';

export const WorkoutDurationForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PreferenceQuestionnaireFormFields>();

  return (
    <Grid container direction={'column'} spacing={2}>
      <Grid item>
        <PreferenceFieldForm
          title={'Tell me about your workout times preferences'}
          fields={[
            {
              fieldTitle: 'How long do you want your workouts to be?',
              field: (
                <Grid container>
                  <Grid item xs={5}>
                    <FormTextField
                      {...register(PreferenceQuestionnaireFieldsNames.WORKOUT_DURATION_IN_MINUTES)}
                      variant={'outlined'}
                      sx={style.textField}
                      type={'number'}
                      InputProps={{ endAdornment: 'minutes', inputProps: { min: 0, max: 60 } }}
                      error={
                        !!errors[PreferenceQuestionnaireFieldsNames.WORKOUT_DURATION_IN_MINUTES]
                      }
                    />
                  </Grid>
                </Grid>
              ),
              required: true,
            },
            {
              fieldTitle: 'What time of day do you prefer to workout?',
              field: (
                <Grid container>
                  <Grid item xs={5}>
                    <FormTextField
                      {...register(PreferenceQuestionnaireFieldsNames.WORKOUT_TIME)}
                      variant={'outlined'}
                      sx={style.textField}
                      type={'time'}
                      error={!!errors[PreferenceQuestionnaireFieldsNames.WORKOUT_TIME]}
                    />
                  </Grid>
                </Grid>
              ),
              required: true,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};
