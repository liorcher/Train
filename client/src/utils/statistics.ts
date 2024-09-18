import { ActivityLevel } from '@/components/PreferenceQuestionnaire/types';

export const isLosingWeight = (startWeight: number, targetWeight: number): boolean =>
  startWeight > targetWeight;

export const getWeightProgressPercentage = (
  startWeight: number,
  targetWeight: number,
  currentWeight: number
): number => {
  if (startWeight === targetWeight) return 0;

  if (isLosingWeight(startWeight, targetWeight)) {
    return ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100;
  } else {
    return ((currentWeight - startWeight) / (targetWeight - startWeight)) * 100;
  }
};

export const getBaseCaloriesPerWorkout = (activityLevel: ActivityLevel): number => {
  switch (activityLevel) {
    case ActivityLevel.BEGINNER:
      return 300;
    case ActivityLevel.INTERMEDIATE:
      return 500;
    case ActivityLevel.ADVANCED:
      return 700;
    default:
      return 0;
  }
};
