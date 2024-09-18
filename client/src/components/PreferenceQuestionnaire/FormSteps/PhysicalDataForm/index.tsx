import { useFormContext } from 'react-hook-form';
import { PreferenceQuestionnaireFormFields } from '../../types';
import style, { FormTextField, StepSubTitle } from '../style';
import { Grid } from '@mui/material';
import { PreferenceQuestionnaireFieldsNames } from '../../formFields';
import { PreferenceFieldForm } from '../PreferenceFieldForm';

export const PhysicalDataForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PreferenceQuestionnaireFormFields>();

  return (
    <PreferenceFieldForm
      title={'Please fill your physical data'}
      fields={[
        {
          field: (
            <Grid container justifyContent={'space-between'}>
              <Grid item xs={5}>
                <StepSubTitle required>{'What is your current weight'}</StepSubTitle>
                <FormTextField
                  {...register(PreferenceQuestionnaireFieldsNames.WEIGHT)}
                  variant={'outlined'}
                  sx={style.textField}
                  type={'number'}
                  InputProps={{ endAdornment: 'kg' }}
                  error={!!errors[PreferenceQuestionnaireFieldsNames.WEIGHT]}
                />
              </Grid>
              <Grid item xs={5}>
                <StepSubTitle required>{'What is your target weight'}</StepSubTitle>
                <FormTextField
                  {...register(PreferenceQuestionnaireFieldsNames.TARGET_WEIGHT)}
                  variant={'outlined'}
                  sx={style.textField}
                  type={'number'}
                  InputProps={{ endAdornment: 'kg' }}
                  error={!!errors[PreferenceQuestionnaireFieldsNames.TARGET_WEIGHT]}
                />
              </Grid>
            </Grid>
          ),
          required: true,
        },
        {
          fieldTitle: 'How tall are you?',
          field: (
            <Grid container>
              <Grid item xs={5}>
                <FormTextField
                  {...register(PreferenceQuestionnaireFieldsNames.HEIGHT)}
                  variant={'outlined'}
                  sx={style.textField}
                  type={'number'}
                  InputProps={{ endAdornment: 'cm' }}
                  error={!!errors[PreferenceQuestionnaireFieldsNames.HEIGHT]}
                />
              </Grid>
            </Grid>
          ),
          required: true,
        },
      ]}
    />
  );
};
