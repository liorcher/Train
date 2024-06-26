export type Workout = {
  type: WorkoutType
  durationMin: number
  datetime: Date
  calories: number
  done: boolean
}

export enum WorkoutType {
  Strength = "Strength",
  Cardio = "Cardio",
  Flexibility = "Flexibility",
}
