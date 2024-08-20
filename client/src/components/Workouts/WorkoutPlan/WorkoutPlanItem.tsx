import { Box, Grid, IconButton, TextField, Typography } from '@mui/material';
import { format } from 'date-fns';
import { Dispatch, SetStateAction, useState } from 'react';
import Styles from './WorkoutPlan.style';
import { Workout } from '@/models';
import { CheckCircle, RemoveCircle } from '@mui/icons-material';
import { WorkoutApi } from '@/api';
import { usePersonalizedTrainingPlanContext } from '@/contexts';
import { toast } from 'sonner';

type Props = {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout | null>>;
  index: number;
};

const WorkoutPlanItem = ({ workout, setWorkout, index }: Props) => {
  const datetime = format(workout.date, 'EEEE, HH:mm, dd/MM/yyyy');
  const [caloriesBurned, setCaloriesBurned] = useState(workout.caloriesBurned);
  const { workouts, updateWorkouts } = usePersonalizedTrainingPlanContext();

  const saveCaloriesBurned = async () => {
    if (caloriesBurned !== workout.caloriesBurned) {
      try {
        await WorkoutApi.updateWorkoutProgress({ ...workout, caloriesBurned });
        updateWorkouts(
          workouts.map((workout) =>
            workout.id === workout.id ? { ...workout, caloriesBurned } : workout
          )
        );
        toast.success('Calories burned saved successfully');
      } catch (error) {
        toast.error('Failed to update calories burned');
        console.error(error);
      }
    }
  };

  const saveWorkoutProgress = async (isDone: boolean) => {
    try {
      if (workout.isDone !== isDone) {
        await WorkoutApi.updateWorkoutProgress({ ...workout, isDone });
        updateWorkouts(
          workouts.map((workout) => (workout.id === workout.id ? { ...workout, isDone } : workout))
        );
        toast.success('Workout progress saved successfully');
      }
    } catch (error) {
      toast.error('Failed to update workout progress');
      console.error(error);
    }
  };

  const onDoneClick = () => saveWorkoutProgress(true);
  const onNotDoneClick = () => saveWorkoutProgress(false);

  const onCaloriesBurnedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaloriesBurned(parseInt(e.target.value));
  };

  return (
    <Box
      sx={Styles.workoutPlanItemBox(workout.isDone)}
      key={index}
      onClick={() => setWorkout(workout)}
    >
      <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Grid item xs={8} container direction={'row'}>
          <Typography {...Styles.workoutPlanItemField}>{datetime}</Typography>
          <Typography {...Styles.workoutPlanItemField}>{workout.title}</Typography>
          <Typography {...Styles.workoutPlanItemField} variant='h5'>
            {`${workout.duration} minutes`}
          </Typography>
        </Grid>
        <Grid item xs={4} container direction={'column'} alignItems={'center'}>
          <Grid item>
            <IconButton
              onClick={onDoneClick}
              sx={{ color: workout.isDone ? 'success.main' : 'primary.light' }}
            >
              <Typography variant='h5'>{'Done'}</Typography>
              <CheckCircle />
            </IconButton>
            <IconButton
              onClick={onNotDoneClick}
              sx={{ color: !workout.isDone ? 'error.main' : 'primary.light' }}
            >
              <Typography variant='h5'>{'Not Done'}</Typography>
              <RemoveCircle />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{
                '& .MuiInputBase-root': {
                  border: '1px solid white',
                  height: '30px',
                  color: 'white',
                  fontSize: '13px',
                },
              }}
              type={'number'}
              InputProps={{ endAdornment: 'cal' }}
              value={workout.caloriesBurned || 0}
              onChange={onCaloriesBurnedChange}
              onBlur={saveCaloriesBurned}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WorkoutPlanItem;
