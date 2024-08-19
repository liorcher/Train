export interface Workout {
  id: string;
  userId: string;
  title: string;
  duration: number;
  exercises: Exercise[];
  date: string;
  isDone: boolean;
  caloriesBurned?: number;
}

export interface Exercise {
  name: string;
  sets: number;
  mainWorkingMuscle: string;
  rest: string;
  description: string;
  link: string;
}
