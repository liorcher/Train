export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  filledPreferences: boolean;
  age: number;
  weight: number;
  height: number;
  gender: string;
  weightsProgress: number[];
  activityLevel: string;
}
