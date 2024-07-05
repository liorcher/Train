import { FormWrapper } from './style';
import { Form } from './Form';
import { Grid } from '@mui/material';

export const PreferenceQuestionnaire: React.FC = () => {
  return (
    <Grid container height={'100vh'} justifyContent={'space-evenly'} position={'relative'}>
      <img />
      <FormWrapper direction={'column'}>
        <Form />
      </FormWrapper>
      <img />
    </Grid>
  );
};
