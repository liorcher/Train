export type Workout = {
  type: WorkoutType
  durationMin: number
  datetime: Date
  calories: number
}

export enum WorkoutType {
  Strength = "Strength",
  Cardio = "Cardio",
  Flexibility = "Flexibility",
}
