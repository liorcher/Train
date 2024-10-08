import Loader from '@/components/Loader';
import { CalendarToday, FormatListBulleted, Refresh } from '@mui/icons-material';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import Styles from './WorkoutPlan.style';
import WorkoutPlanItem from './WorkoutPlanItem';
import { WorkoutsCalendar } from '../WorkoutsCalendar';
import { Workout } from '@/models';
import { usePersonalizedTrainingPlanContext } from '@/contexts';
import { getWeeklyWorkoutPlan } from '@/utils';

type Props = {
  workouts: Workout[];
  setWorkout: Dispatch<SetStateAction<Workout | null>>;
  refreshWorkouts: VoidFunction;
};

const WorkoutPlan = ({ workouts, setWorkout, refreshWorkouts }: Props) => {
  const [isRegularView, setIsRegularView] = useState(true);
  const { loading } = usePersonalizedTrainingPlanContext();

  return (
    <Box sx={Styles.outerBox}>
      <Grid item alignSelf={'flex-start'}>
        <Tooltip title={isRegularView ? 'Calendar View' : 'List View'}>
          <IconButton onClick={() => setIsRegularView((prev) => !prev)}>
            {!isRegularView ? (
              <FormatListBulleted sx={{ color: 'primary.light' }} />
            ) : (
              <CalendarToday sx={{ color: 'primary.light' }} />
            )}
          </IconButton>
        </Tooltip>
      </Grid>
      {isRegularView ? (
        <>
          <Box sx={Styles.titleBox}>
            <Typography {...Styles.title}>Your Weekly Workout Plan</Typography>
            <Box sx={Styles.refreshIconBox}>
              <Tooltip title='Refresh workout plan'>
                <IconButton onClick={refreshWorkouts}>
                  <Refresh {...Styles.refreshIcon} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          {loading ? (
            <Loader />
          ) : workouts.length == 0 ? (
            <Typography {...Styles.workoutPlanItemField}>
              Looks like no training this week...
            </Typography>
          ) : (
            <Box sx={Styles.workoutList}>
              {getWeeklyWorkoutPlan(workouts).map((workout, index) => (
                <WorkoutPlanItem
                  key={index}
                  workout={workout}
                  setWorkout={setWorkout}
                  index={index}
                />
              ))}
            </Box>
          )}
        </>
      ) : (
        <WorkoutsCalendar workouts={workouts} setWorkout={setWorkout} />
      )}
    </Box>
  );
};

export default WorkoutPlan;
