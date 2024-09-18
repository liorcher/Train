/* eslint-disable @typescript-eslint/no-explicit-any */
import { WorkoutApi } from '@/api';
import { Workout } from '@/models';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

type PersonalizedTrainingPlanContext = {
  loading: boolean;
  isGeneratingPlan: boolean;
  setLoading: (loading: boolean) => void;
  workouts: Workout[];
  updateWorkouts: (workouts: Workout[]) => void;
  generateTraningPlan: () => Promise<void>;
};

const initalState: PersonalizedTrainingPlanContext = {
  workouts: [],
  loading: false,
  isGeneratingPlan: false,
  updateWorkouts: () => {},
  setLoading: () => {},
  generateTraningPlan: async () => {},
};

const PersonalizedTrainingPlanContext = createContext(initalState);
export const usePersonalizedTrainingPlanContext = () => useContext(PersonalizedTrainingPlanContext);

export const PersonalizedTrainingPlanProvider: React.FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchWorkouts();
  }, [currentUser]);

  const fetchWorkouts = useCallback(async () => {
    try {
      setLoading(true);
      if (currentUser) {
        const workouts = await WorkoutApi.getUserWorkouts();
        updateWorkouts(workouts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const updateWorkouts = (workouts: Workout[]) => setWorkouts(workouts);

  const generateTraningPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const workouts = await WorkoutApi.createWorkoutPlan();
      updateWorkouts(workouts);
      toast.success('your workout plan has been created successfully');
    } catch (error) {
      toast.error('error occured while trying to create user plan');
      console.error('error occured while trying to create user plan', error);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  return (
    <PersonalizedTrainingPlanContext.Provider
      value={{
        workouts,
        loading,
        isGeneratingPlan,
        updateWorkouts,
        generateTraningPlan,
        setLoading,
      }}
    >
      {children}
    </PersonalizedTrainingPlanContext.Provider>
  );
};
