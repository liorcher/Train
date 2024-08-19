import { Dispatch, SetStateAction } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style.css';
import { Workout } from '@/models';

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
          start: dayjs(workout.date).toDate(),
          end: dayjs(workout.date).add(workout.duration, 'minutes').toDate(),
        })) ?? []
      }
      onSelectEvent={(workout) => setWorkout(workout)}
      localizer={dayjsLocalizer(dayjs)}
    />
  );
};
