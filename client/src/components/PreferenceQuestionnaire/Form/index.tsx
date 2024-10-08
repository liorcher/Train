import React from 'react';
import { Dialog, Grid, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppLogo } from '../../../assets';
import dictionary from '../../../dictionary';
import { useLoading, useMultiStepForm } from '../../../hooks';
import { ProgressBar } from './style';
import { PreferenceQuestionnaireFormFields } from '../types';
import {
  convertFormValuesToApi,
  convertPreferencesToFormFields,
  getFormDefaultValues,
  PreferenceQuestionnaireFieldsNames,
} from '../formFields';
import { validationSchema } from '../validation';
import {
  AboutYourselfForm,
  ActivityLevelForm,
  DaysForm,
  GoalsForm,
  PhysicalDataForm,
  SubmitForm,
  WorkoutDurationForm,
  WorkoutsForm,
} from '../FormSteps';
import { PreferencesApi } from '@/api';
import Loader from '@/components/Loader';
import { useAuth } from '@/contexts/AuthContext';
import { useGlobalModalContext } from '@/contexts';
import { FormActionButton } from '@/components';
import { PreferencesQuestionnaireProvider } from './PreferencesQuestionnaireContext';
import { PreferencesMetaData } from '@/models';
import { FormStepIcon } from './FormStepIcon';
import { stepsIcons } from '../consts';

interface Props {
  preferences?: PreferencesMetaData;
  filledPreferences?: boolean;
  onSaveSuccess: VoidFunction;
}

export const Form: React.FC<Props> = ({
  onSaveSuccess,
  filledPreferences = false,
  preferences,
}) => {
  const {
    multiStepForm: { nextBtn, doneBtn, backBtn },
  } = dictionary;

  const { currentStepIndex, isFirstStep, isLastStep, step, steps, next, back, goTo } =
    useMultiStepForm([
      <AboutYourselfForm />,
      <PhysicalDataForm />,
      <ActivityLevelForm />,
      <GoalsForm />,
      <DaysForm />,
      <WorkoutsForm />,
      <WorkoutDurationForm />,
      <SubmitForm />,
    ]);

  const form = useForm<PreferenceQuestionnaireFormFields>({
    mode: 'onSubmit',
    defaultValues: preferences
      ? convertPreferencesToFormFields(preferences)
      : getFormDefaultValues(),
    resolver: yupResolver(validationSchema),
  });

  const { setCurrentUser } = useAuth();
  const { loading, startLoading, stopLoading } = useLoading();
  const { hideModal } = useGlobalModalContext();
  const { handleSubmit, trigger } = form;

  const onSubmit = async (values: PreferenceQuestionnaireFormFields) => {
    try {
      startLoading();
      const user = await PreferencesApi.saveUserPreferences(convertFormValuesToApi(values));
      setCurrentUser(user);
      hideModal();
      onSaveSuccess();
    } catch (error) {
      console.error('An error occurred while saving user preferences', error);
    } finally {
      stopLoading();
    }
  };

  const handleGoToSubmit = async () => {
    const isValid = await trigger();

    if (isValid) {
      goTo(steps.length - 1);
    }
  };

  const handleNext = async () => {
    let isValid = false;

    switch (currentStepIndex) {
      case 0:
        isValid = await trigger([
          PreferenceQuestionnaireFieldsNames.AGE,
          PreferenceQuestionnaireFieldsNames.GENDER,
        ]);
        break;
      case 1:
        isValid = await trigger([
          PreferenceQuestionnaireFieldsNames.HEIGHT,
          PreferenceQuestionnaireFieldsNames.WEIGHT,
          PreferenceQuestionnaireFieldsNames.TARGET_WEIGHT,
        ]);
        break;
      case 2:
        isValid = await trigger([PreferenceQuestionnaireFieldsNames.ACTIVITY_LEVEL]);
        break;
      case 3:
        isValid = await trigger([PreferenceQuestionnaireFieldsNames.GOALS]);
        break;
      case 4:
        isValid = await trigger([PreferenceQuestionnaireFieldsNames.DAYS]);
        break;
      case 5:
        isValid = await trigger([PreferenceQuestionnaireFieldsNames.WORKOUTS]);
        break;
      case 6:
        isValid = await trigger([
          PreferenceQuestionnaireFieldsNames.WORKOUT_DURATION_IN_MINUTES,
          PreferenceQuestionnaireFieldsNames.WORKOUT_TIME,
        ]);
        break;
    }

    if (isValid) {
      next();
    }
  };

  return (
    <Dialog open onClose={hideModal} maxWidth={'sm'} fullWidth>
      <FormProvider {...form}>
        <PreferencesQuestionnaireProvider
          filledPreferences={filledPreferences}
          currentStepIndex={currentStepIndex}
        >
          <form>
            <Grid container height={'100%'} p={4} direction={'column'}>
              <Grid
                item
                container
                position={'absolute'}
                alignItems={'center'}
                justifyContent={'center'}
              ></Grid>
              <Grid item container direction={'column'} alignItems={'center'}>
                <Grid item>
                  <img src={AppLogo} width={100} height={'fit-content'} />
                </Grid>
              </Grid>
              <Grid item container direction={'column'} justifyContent={'flex-start'} marginTop={2}>
                <Grid container item justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant='h6' fontWeight={'500'} color={'info.main'}>
                    {`Step ${currentStepIndex + 1} / ${steps.length}`}
                  </Typography>
                  {stepsIcons.map((step, index) => (
                    <FormStepIcon
                      key={index}
                      title={step.title}
                      Icon={step.Icon}
                      onClick={() => goTo(index)}
                      isSelected={currentStepIndex === index}
                    />
                  ))}
                  {filledPreferences && (
                    <Typography
                      onClick={handleGoToSubmit}
                      variant='h6'
                      color={'info.main'}
                      fontWeight={'700'}
                      sx={{ cursor: 'pointer' }}
                    >
                      {`skip to end >>`}
                    </Typography>
                  )}
                </Grid>
                <ProgressBar
                  variant={'fullWidth'}
                  orientation={'horizontal'}
                  precentage={(currentStepIndex / steps.length) * 100}
                />
                <Grid
                  item
                  container
                  gap={'1rem .5rem'}
                  direction={'column'}
                  sx={{ height: '300px' }}
                  p={2}
                  marginTop={2}
                >
                  {step}
                </Grid>
              </Grid>
              <Grid item container alignSelf={'flex-end'} justifyContent={'space-between'}>
                <Grid item>
                  {!isFirstStep && <FormActionButton onClick={back}>{backBtn}</FormActionButton>}
                </Grid>
                <Grid item>
                  <FormActionButton
                    disabled={isLastStep ? !!Object.keys(form.formState.errors).length : false}
                    onClick={isLastStep ? handleSubmit(onSubmit) : handleNext}
                  >
                    {isLastStep ? doneBtn : nextBtn}
                    {loading && <Loader size={25} />}
                  </FormActionButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </PreferencesQuestionnaireProvider>
      </FormProvider>
    </Dialog>
  );
};
