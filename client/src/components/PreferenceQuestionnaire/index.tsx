import { FormWrapper } from './style';
import { Form } from './Form';
import { Grid } from '@mui/material';

export const PreferenceQuestionnaire: React.FC = () => {
  return (
    <Grid container justifyContent={'space-evenly'}>
      <img />
      <FormWrapper direction={'column'}>
        <Form />
      </FormWrapper>
      <img />
    </Grid>
  );
};
