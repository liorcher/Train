import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { TrainerChat } from '../TrainerChat';

export const SubmitForm: React.FC = () => {
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    // Show loading dots first, then reveal the message
    const timer = setTimeout(() => {
      setShowSecondMessage(true);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container direction={'column'} gap={'1rem .5rem'}>
      <TrainerChat title={`Thank you, that's it`} showMessage />
      {showSecondMessage && <TrainerChat title={`Press Done to start training`} showMessage />}
    </Grid>
  );
};
