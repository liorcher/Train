import { Workout } from '@/models';

export const workoutsMockData: Workout[] = [
  {
    id: '1',
    userId: '323100347',
    title: 'Stength',
    duration: '45 minutes',
    exercies: [
      {
        name: 'Bench Press',
        sets: 3,
        mainWorkingMuscle: 'Chest',
        rest: '90 seconds',
        description:
          'A compound exercise targeting the chest, triceps, and shoulders. Ensure to maintain a controlled motion and avoid bouncing the bar off the chest.',
        link: 'https://www.youtube.com/watch?v=gRVjAtPip0Y ',
      },
      {
        name: 'Incline Dumbbell Press',
        sets: 3,
        mainWorkingMuscle: 'Upper Chest',
        rest: '90 seconds',
        description:
          'Focuses on the upper chest. Keep a controlled motion and avoid locking out the elbows.',
        link: 'https://www.youtube.com/watch?v=8iPEnn-ltC8 ',
      },
    ],
    date: '2024-08-18T10:00:00',
    isDone: false,
    caloriesBurned: 0,
  },
  {
    id: '2',
    userId: '323100347',
    title: 'Back and Biceps',
    duration: '45 minutes',
    date: '2024-08-20T10:00:00',
    isDone: false,
    exercies: [
      {
        name: 'Deadlift',
        sets: 3,
        mainWorkingMuscle: 'Back',
        rest: '90 seconds',
        description:
          'A compound exercise that targets the back, glutes, and hamstrings. Keep your back straight and lift with your legs.',
        link: 'https://www.youtube.com/watch?v=ytGaGIn3SjE ',
      },
      {
        name: 'Pull-Ups',
        sets: 3,
        mainWorkingMuscle: 'Upper Back',
        rest: '90 seconds',
        description:
          'Targets the upper back and biceps. Avoid swinging and keep a controlled motion.',
        link: 'https://www.youtube.com/watch?v=eGo4IYlbE5g ',
      },
    ],
  },
];
