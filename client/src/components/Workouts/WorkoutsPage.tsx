import { Box, Stack } from '@mui/material';
import { find, map } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import WorkoutActivity from './WorkoutActivity/WorkoutActivity';
import WorkoutPlan from './WorkoutPlan/WorkoutPlan';
import Styles from './WorkoutsPage.style';
import { useAuth, usePersonalizedTrainingPlanContext } from '@/contexts';
import { Workout } from '@/models';
import { WorkoutApi } from '@/api';

const WorkoutsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { workouts, updateWorkouts, setLoading } = usePersonalizedTrainingPlanContext();
  const [workout, setWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    const updatedWorkout = find(workouts, { id: workout?.id }) || (workouts && workouts[0]) || null;
    setWorkout(updatedWorkout);
  }, []);

  const refreshWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      if (currentUser) {
        const workouts = await WorkoutApi.createWorkoutPlan();
        updateWorkouts(workouts);

        const updatedWorkout =
          find(workouts, { id: workout?.id }) || (workouts && workouts[0]) || null;
        setWorkout(updatedWorkout);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentUser, workout]);

  const updateWorkout = (updatedWorkout: Workout) => {
    if (!workouts) return;

    const updatedWorkouts = map(workouts, (currentWorkout: Workout) =>
      currentWorkout.id === updatedWorkout.id ? updatedWorkout : currentWorkout
    );
    updateWorkouts(updatedWorkouts);
    setWorkout(updatedWorkout);
  };

  return (
    <Box sx={Styles.outerBox}>
      <Stack {...Styles.stack}>
        <WorkoutPlan
          workouts={workouts}
          setWorkout={setWorkout}
          refreshWorkouts={refreshWorkouts}
        />
        {workout && <WorkoutActivity workout={workout} updateWorkout={updateWorkout} />}
      </Stack>
    </Box>
  );
};

export default WorkoutsPage;
