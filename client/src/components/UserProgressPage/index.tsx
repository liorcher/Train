import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import { PREFERENCE_QUESTIONNAIRE_URL } from '@/router/router.const';
import { useAuth } from '@/contexts/AuthContext';
import Loader from '../Loader';
import { WithTrainersImages } from '../HOC';

export const UserProgressPage = WithTrainersImages(() => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  return loading ? (
    <Loader />
  ) : (
    <Grid container height={'100%'} p={'30px'} direction={'column'} rowGap={'2rem'}>
      <Grid item>
        <Typography variant={'h3'} color={'secondary.light'} fontWeight={700}>
          {`Welcome Back, ${currentUser?.name}`}
          <br />
        </Typography>
      </Grid>
      {!currentUser?.filledPreferences && (
        <Grid item container direction={'row'} alignItems={'center'}>
          <Grid item>
            <Typography variant={'h4'} color={'secondary.light'}>
              {"Wanted to let you know that you didn't filled your preferences yet >"}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => navigate(PREFERENCE_QUESTIONNAIRE_URL)}>
              <Typography
                variant={'h4'}
                color={'info.light'}
                fontWeight={600}
                sx={{ textDecoration: 'underline' }}
              >
                {'Fill now'}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
});
