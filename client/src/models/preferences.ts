export type PreferencesMetaData = {
  age: number;
  weight: number;
  targetWeight?: number;
  height: number;
  activityLevel: string;
  goals: string[];
  days: string[];
  workouts: string[];
  durationInMinutes: number;
};

export interface UserGoals {
  targetWeight: number;
  goals: string[];
  days: string[];
  workouts: string[];
  durationInMinutes: number;
}
