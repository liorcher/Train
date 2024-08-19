import React from 'react';
import ReactPlayer from 'react-player';
import { Grid, Tooltip, Typography } from '@mui/material';
import { Exercise } from '@/models';
import Styles from '../WorkoutActivity.style';
import ExerciseStyles from './WorkoutExercise.style';

interface Props {
  exerciseNumber: number;
  exercisesAmount: number;
  exercise: Exercise;
}

export const WorkoutExercise: React.FC<Props> = ({ exerciseNumber, exercisesAmount, exercise }) => {
  return (
    <Grid item container direction={'row'} alignItems={'center'}>
      <Grid item container direction={'row'} alignItems={'center'} {...ExerciseStyles.container}>
        <Grid item xs={6}>
          <Tooltip title={exercise.name}>
            <Typography
              {...Styles.workoutActivityExerciseTitle}
            >{`${exercise.name} (${exerciseNumber}/${exercisesAmount})`}</Typography>
          </Tooltip>
        </Grid>
        <Grid item container direction={'row'} xs={5}>
          <Typography {...Styles.workoutActivityField}>{`Focus: ${exercise.sets}`}</Typography>
          <Typography {...Styles.workoutActivityField}>{`Sets: ${exercise.sets}`}</Typography>
          <Tooltip title={exercise.rest} placement={'top'} arrow>
            <Typography
              {...Styles.workoutActivityField}
            >{`Rest Between Sets: ${exercise.rest}`}</Typography>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid item container direction={'row'} alignItems={'center'} p={2} rowGap={'1rem'}>
        <Typography {...ExerciseStyles.exerciseDescription}>{exercise.description}</Typography>
        <ReactPlayer width={'100%'} height={'230px'} url={exercise.link} />
      </Grid>
    </Grid>
  );
};
