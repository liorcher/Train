import { Box, Stack } from '@mui/material';
import { find, map } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import WorkoutActivity from './WorkoutActivity/WorkoutActivity';
import WorkoutPlan from './WorkoutPlan/WorkoutPlan';
import Styles from './WorkoutsPage.style';
import { workoutsMockData } from './workoutsMockData';
// import { WorkoutApi } from '@/api';
import { useAuth } from '@/contexts';
import { Workout } from '@/models';

const WorkoutsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, [currentUser]);

  const fetchWorkouts = useCallback(async () => {
    try {
      if (currentUser) {
        const workouts = workoutsMockData;
        // TODO: Uncomment the following line to fetch workouts from the server
        // const workouts = await WorkoutApi.getWorkoutsByUserId(currentUser.id);

        setWorkouts(null);
        setTimeout(() => {
          setWorkouts(workouts);
          const updatedWorkout =
            find(workouts, { id: workout?.id }) || (workouts && workouts[0]) || null;
          setWorkout(updatedWorkout);
        }, 1000);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentUser, workout]);

  const updateWorkout = (updatedWorkout: Workout) => {
    if (!workouts) return;

    // const updatedWorkouts = api.post('/workout/:id', { workout: updatedWorkout })
    // fetchWorkouts()

    const updatedWorkouts = map(workouts, (currentWorkout: Workout) =>
      currentWorkout.id === updatedWorkout.id ? updatedWorkout : currentWorkout
    );
    setWorkouts(updatedWorkouts);
    setWorkout(updatedWorkout);
  };

  return (
    <Box sx={Styles.outerBox}>
      <Stack {...Styles.stack}>
        <WorkoutPlan workouts={workouts} setWorkout={setWorkout} fetchWorkouts={fetchWorkouts} />
        {workout && <WorkoutActivity workout={workout} updateWorkout={updateWorkout} />}
      </Stack>
    </Box>
  );
};

export default WorkoutsPage;
