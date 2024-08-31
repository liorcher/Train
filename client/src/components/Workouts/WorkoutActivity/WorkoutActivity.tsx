import { Box, Grid, Typography } from '@mui/material';
import { Workout } from '@/models';
import { useMultiStepForm } from '@/hooks';
import Styles from './WorkoutActivity.style';
import { FormActionButton } from '@/components';
import { WorkoutExercise } from './WorkoutExercise/WorkoutExercise';
import { useEffect } from 'react';

type Props = {
  workout: Workout;
  updateWorkout: (workout: Workout) => void;
};

const getWorkoutSteps = (workout: Workout) => {
  return workout.exercises.map((exercise, index) => (
    <WorkoutExercise
      key={exercise.name}
      exerciseNumber={index + 1}
      exercisesAmount={workout.exercises.length}
      exercise={exercise}
    />
  ));
};

const WorkoutActivity = (props: Props) => {
  const { workout } = props;
  const { step, isFirstStep, isLastStep, back, next, goTo } = useMultiStepForm(
    getWorkoutSteps(workout) || []
  );

  useEffect(() => {
    goTo(0);
  }, [workout]);

  return (
    workout && (
      <Box sx={Styles.outerBox}>
        <Box sx={Styles.titleBox}>
          <Typography {...Styles.title}>{workout.title}</Typography>
        </Box>

        <Grid
          container
          alignItems={'center'}
          justifyContent={'center'}
          flexGrow={1}
          p={2}
          sx={{ backgroundColor: '#565151', borderRadius: 2 }}
        >
          {step}
          <Grid item container justifyContent={'space-between'}>
            <Grid item>
              {!isFirstStep && <FormActionButton onClick={back}>{'previous'}</FormActionButton>}
            </Grid>
            <Grid item>
              {!isLastStep && <FormActionButton onClick={next}>{'next'}</FormActionButton>}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

export default WorkoutActivity;
