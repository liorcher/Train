/* eslint-disable @typescript-eslint/no-explicit-any */
import { Workout } from '@/models';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type PersonalizedTrainingPlanContext = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  workouts: Workout[];
  updateWorkouts: (workouts: Workout[]) => void;
};

const initalState: PersonalizedTrainingPlanContext = {
  workouts: [],
  loading: false,
  updateWorkouts: () => {},
  setLoading: () => {},
};

const PersonalizedTrainingPlanContext = createContext(initalState);
export const usePersonalizedTrainingPlanContext = () => useContext(PersonalizedTrainingPlanContext);

export const PersonalizedTrainingPlanProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateWorkouts = (workouts: Workout[]) => setWorkouts(workouts);

  return (
    <PersonalizedTrainingPlanContext.Provider
      value={{ workouts, loading, updateWorkouts, setLoading }}
    >
      {children}
    </PersonalizedTrainingPlanContext.Provider>
  );
};
