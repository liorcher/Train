import {
  FitnessCenter,
  Flag,
  Person,
  Pin,
  SettingsAccessibility,
  Timer,
  Today,
  WhereToVote,
} from '@mui/icons-material';

export const stepsIcons: { title: string; Icon: React.ElementType }[] = [
  { title: 'About Yourself', Icon: Person },
  { title: 'Physical Data', Icon: SettingsAccessibility },
  { title: 'Activity Level', Icon: Pin },
  { title: 'Goals', Icon: Flag },
  { title: 'Days', Icon: Today },
  { title: 'Workouts', Icon: FitnessCenter },
  { title: 'Workout Duration', Icon: Timer },
  { title: 'Submit', Icon: WhereToVote },
];
