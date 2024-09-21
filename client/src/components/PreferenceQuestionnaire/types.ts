export type PreferenceQuestionnaireFormFields = {
  gender: Gender;
  age: number;
  weight: number;
  targetWeight: number;
  height: number;
  activityLevel: ActivityLevel;
  goals: { goal: Goal }[];
  days: { day: Day }[];
  workouts: { workout: Workout }[];
  workoutDurationInMinutes: number;
  workoutTime: string;
};

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum ActivityLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum Goal {
  BUILD_MUSCLE = 'Build muscle',
  LOSE_WEIGHT = 'Lose weight',
  MAINTAIN_WEIGHT = 'Maintain weight',
  TONE_BODY = 'Tone body',
  IMPROVE_FITNESS = 'Improve fitness',
  INCREASE_STRENGTH = 'Increase strength',
}

export enum Day {
  SUNDAY = 'Sunday',
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
}

export enum Workout {
  WALK = 'walk',
  RUN = 'run',
  STRENGTH_WORKOUT = 'strength workout',
  YOGA = 'yoga',
  SWIMMING = 'swimming',
  CYCLING = 'cycling',
}
