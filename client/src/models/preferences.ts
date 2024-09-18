export type PreferencesMetaData = {
  gender: string;
  age: number;
  weight: number;
  targetWeight?: number;
  height: number;
  activityLevel: string;
  goals: string[];
  days: string[];
  workouts: string[];
  workoutDurationInMinutes: number;
  workoutTime: string;
};

export interface UserGoals {
  targetWeight: number;
  goals: string[];
  days: string[];
  workouts: string[];
  durationInMinutes: number;
  workoutTime: string;
}
