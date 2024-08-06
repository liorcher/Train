import { Dispatch, SetStateAction } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { Workout } from '@/types/workout.type';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';

interface Props {
  workouts: Workout[] | null;
  setWorkout: Dispatch<SetStateAction<Workout | null>>;
}

export const WorkoutsCalendar: React.FC<Props> = ({ workouts, setWorkout }) => {
  return (
    <Calendar
      style={{
        width: '100%',
      }}
      events={
        workouts?.map((workout) => ({
          ...workout,
          start: workout.datetime,
          end: dayjs(workout.datetime).add(workout.durationMin, 'minute').toDate(),
        })) ?? []
      }
      onSelectEvent={(workout) => setWorkout(workout)}
      localizer={dayjsLocalizer(dayjs)}
    />
  );
};
