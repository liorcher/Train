import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { format } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import Styles from './WorkoutPlan.style';
import { Workout } from '@/models';
import { CheckCircle, RemoveCircle } from '@mui/icons-material';

type Props = {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout | null>>;
  index: number;
};

const WorkoutPlanItem = ({ workout, setWorkout, index }: Props) => {
  const datetime = format(workout.date, 'EEEE, HH:mm, dd/MM/yyyy');

  return (
    <Box
      sx={Styles.workoutPlanItemBox(workout.isDone)}
      key={index}
      onClick={() => setWorkout(workout)}
    >
      <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Grid item xs={6} container direction={'row'}>
          <Typography {...Styles.workoutPlanItemField}>{datetime}</Typography>
          <Typography {...Styles.workoutPlanItemField}>{workout.title}</Typography>
        </Grid>
        <Grid item>
          <Tooltip title={workout.isDone ? 'Not Done' : 'Done It!'}>
            <IconButton sx={{ color: workout.isDone ? 'success.main' : 'error.main' }}>
              {workout.isDone ? <CheckCircle /> : <RemoveCircle />}
            </IconButton>
          </Tooltip>
          <Typography {...Styles.workoutPlanItemField} variant='h5'>
            {workout.duration}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkoutPlanItem;
