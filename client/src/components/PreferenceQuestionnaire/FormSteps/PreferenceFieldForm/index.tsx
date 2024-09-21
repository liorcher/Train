import React, { useEffect, useState } from 'react';
import { StepSubTitle } from '../style';
import { FormControl, Grid, Grow } from '@mui/material';
import { TrainerChat } from '../TrainerChat';
import { usePreferencesQuestionnaireContext } from '../../Form/PreferencesQuestionnaireContext';

interface Props {
  title: string;
  fields: { fieldTitle?: string; field: React.ReactNode; required: boolean }[];
}

export const PreferenceFieldForm: React.FC<Props> = ({ title, fields }) => {
  const [showMessage, setShowMessage] = useState(false);
  const { currentStepIndex, lastLoadedStepIndex, filledPreferences, incrementLastLoadedStepIndex } =
    usePreferencesQuestionnaireContext();

  useEffect(() => {
    if (filledPreferences || currentStepIndex < lastLoadedStepIndex) {
      setShowMessage(true);
      return;
    }
    // Show loading dots first, then reveal the message
    const timer = setTimeout(() => {
      setShowMessage(true);
      incrementLastLoadedStepIndex();
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container height={'100%'} gap={'1rem .5rem'} direction={'column'} marginTop={2}>
      <TrainerChat title={title} showMessage={showMessage} />
      <Grow in={showMessage} timeout={2500}>
        <Grid item container gap={'2rem .5rem'} flexGrow={1}>
          {fields.map(({ fieldTitle, field, required }, index) => (
            <Grid item container key={`preferencesFormStepField-${index}`} flexGrow={1}>
              <FormControl fullWidth>
                {fieldTitle && <StepSubTitle required={required}>{fieldTitle}</StepSubTitle>}
                {field}
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </Grow>
    </Grid>
  );
};
