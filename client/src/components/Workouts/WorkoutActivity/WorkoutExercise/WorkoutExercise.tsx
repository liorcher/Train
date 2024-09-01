import React, { useCallback, useState } from 'react';
import ReactPlayer from 'react-player';
import { Grid, Link, Tooltip, Typography } from '@mui/material';
import { Exercise } from '@/models';
import Styles from '../WorkoutActivity.style';
import ExerciseStyles from './WorkoutExercise.style';
import { YoutubeApi } from '@/api';

interface Props {
  exerciseNumber: number;
  exercisesAmount: number;
  exercise: Exercise;
}

export const WorkoutExercise: React.FC<Props> = ({ exerciseNumber, exercisesAmount, exercise }) => {
  const [isVideoError, setIsVideoError] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [fallbackLink, setFallbackLink] = useState('');

  const getYouTubeSearchLink = async (title: string) => {
    try {
      const { isSuccessful, link } = await YoutubeApi.fetchFirstYouTubeVideo(title);
      isSuccessful ? setVideoLink(link) : setFallbackLink(link);
    } catch (error) {
      console.error('Failed to fetch video link', error);
    }
  };

  const handleVideoError = useCallback(() => {
    if (!videoLink) {
      setIsVideoError(true);
      getYouTubeSearchLink(exercise.name);
    }
  }, []);

  return (
    <Grid item container direction={'row'} alignItems={'center'}>
      <Grid
        item
        container
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        {...ExerciseStyles.container}
      >
        <Grid item xs={7}>
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
        <Typography
          {...ExerciseStyles.exerciseDescription}
        >{`Note: ${exercise.description}`}</Typography>
        {!isVideoError || videoLink ? (
          <ReactPlayer
            width={'100%'}
            height={'230px'}
            url={!isVideoError ? exercise.link : videoLink}
            onError={handleVideoError}
          />
        ) : (
          <Typography
            color={'primary.light'}
            variant='h5'
            textAlign={'center'}
            width={'100%'}
            height={'230px'}
          >
            {fallbackLink ? (
              <Link
                color={'primary.light'}
                href={fallbackLink}
                target='_blank'
                rel='noopener noreferrer'
              >
                {`Click here to search for ${exercise.name} on YouTube`}
              </Link>
            ) : (
              'No video available'
            )}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
