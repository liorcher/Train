import { Workout } from '@/types/workout.type';
import { Box, Stack } from '@mui/material';
import { find, map } from 'lodash';
import React, { useEffect, useState } from 'react';
import WorkoutActivity from './WorkoutActivity/WorkoutActivity';
import WorkoutPlan from './WorkoutPlan/WorkoutPlan';
import Styles from './WorkoutsPage.style';
import { workoutsMockData } from './workoutsMockData';

const WorkoutsPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = () => {
    // const serverWorkouts = api.get('/workouts')
    const serverWorkouts = workoutsMockData;

    setWorkouts(null);
    setTimeout(() => {
      setWorkouts(serverWorkouts);
      const updatedWorkout =
        find(serverWorkouts, { id: workout?.id }) || (serverWorkouts && serverWorkouts[0]) || null;
      setWorkout(updatedWorkout);
    }, 1000);
  };

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
        <WorkoutActivity workout={workout} updateWorkout={updateWorkout} />
      </Stack>
    </Box>
  );
};

export default WorkoutsPage;
