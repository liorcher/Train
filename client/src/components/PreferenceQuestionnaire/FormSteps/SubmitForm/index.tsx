import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { TrainerChat } from '../TrainerChat';
import { useFormContext } from 'react-hook-form';
import { PreferenceQuestionnaireFormFields } from '../../types';
import { usePreferencesQuestionnaireContext } from '../../Form/PreferencesQuestionnaireContext';

export const SubmitForm: React.FC = () => {
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const { filledPreferences } = usePreferencesQuestionnaireContext();
  const { trigger } = useFormContext<PreferenceQuestionnaireFormFields>();

  useEffect(() => {
    // Show loading dots first, then reveal the message
    trigger();
    const timer = setTimeout(() => {
      setShowSecondMessage(true);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container direction={'column'} gap={'1rem .5rem'}>
      <TrainerChat title={`Thank you, that's it`} showMessage />
      {showSecondMessage && (
        <TrainerChat
          title={`Press Done to ${
            filledPreferences ? 'update your workout plan' : 'start training'
          }`}
          showMessage
        />
      )}
    </Grid>
  );
};
