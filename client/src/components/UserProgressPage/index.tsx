import { useLocation } from 'react-router-dom';
import { Button, Grid, Grow, Typography } from '@mui/material';
import {
  useGlobalModalContext,
  usePersonalizedTrainingPlanContext,
  usePreferencesContext,
} from '@/contexts';
import { useAuth } from '@/contexts/AuthContext';
import Loader from '../Loader';
import { Form } from '../PreferenceQuestionnaire/Form';
import { WithTrainersImages } from '../HOC';
import style from './style';
import { UserProgressContainer } from './charts';
import { useEffect } from 'react';

export const UserProgressPage = WithTrainersImages(() => {
  const { currentUser, loading: loadingUser } = useAuth();
  const location = useLocation();
  const { showModal } = useGlobalModalContext();
  const {
    isGeneratingPlan,
    loading: loadingWorkouts,
    generateTraningPlan,
  } = usePersonalizedTrainingPlanContext();
  const { preferences, fetchPreferences } = usePreferencesContext();
  const isLoading = loadingUser || loadingWorkouts;
  const showIntroduction = !!location?.state?.firstTime;

  useEffect(() => {
    !preferences && currentUser?.filledPreferences && fetchPreferences();
  }, [currentUser]);

  return isGeneratingPlan ? (
    <Grid
      container
      height={'100%'}
      alignContent={'center'}
      justifyContent={'center'}
      sx={{ backgroundColor: 'secondary.dark' }}
      direction={'column'}
    >
      <Loader
        LoadingText={
          <Typography
            variant={'h3'}
            color={'secondary.light'}
            fontWeight={700}
            textAlign={'center'}
            sx={style.loadingText}
          >
            {`I'm setting up your custom training plan`}
            <br />
            {'Please wait a moment'}
          </Typography>
        }
      />
    </Grid>
  ) : isLoading ? (
    <Loader />
  ) : (
    <Grid
      container
      height={'100%'}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      rowGap={'1rem'}
      p={'30px'}
      width={'fit-content'}
      position={'relative'}
    >
      <Grid item>
        <Grow in timeout={3000}>
          <Typography variant={'h3'} color={'secondary.light'} fontWeight={700}>
            {showIntroduction ? 'Welcome to TRAIN' : `Welcome Back, ${currentUser?.name}`}
            <br />
          </Typography>
        </Grow>
      </Grid>
      <Grow in timeout={6000}>
        {!currentUser?.filledPreferences ? (
          <Grid item container direction={'row'} alignItems={'center'} justifyContent={'center'}>
            <Grid item>
              <Typography variant={'h4'} color={'secondary.light'}>
                {showIntroduction
                  ? 'To start our journey, I need to know more about you, click here to fill your preferences >'
                  : "Wanted to let you know that you didn't filled your preferences yet >"}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                onClick={() =>
                  showModal(Form, {
                    onSaveSuccess: () => {
                      fetchPreferences();
                      generateTraningPlan();
                    },
                  })
                }
              >
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
        ) : (
          <Grid item>
            <UserProgressContainer />
          </Grid>
        )}
      </Grow>
    </Grid>
  );
});
