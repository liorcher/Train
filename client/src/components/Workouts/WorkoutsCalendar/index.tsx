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
  const getWorkoutEndDate = (workout: Workout) => {
    // split string of number and units of duration
    const [duration, unit] = workout.duration.split(' ');

    if (unit.includes('min') || unit.includes('minute')) {
      return dayjs(workout.date).add(Number(duration), 'minute').toDate();
    } else if (unit.includes('hour') || unit.includes('hr')) {
      return dayjs(workout.date).add(Number(duration), 'hour').toDate();
    }
  };

  return (
    <Calendar
      style={{
        width: '100%',
      }}
      events={
        workouts?.map((workout) => ({
          ...workout,
          start: dayjs(workout.date).toDate(),
          end: getWorkoutEndDate(workout),
        })) ?? []
      }
      onSelectEvent={(workout) => setWorkout(workout)}
      localizer={dayjsLocalizer(dayjs)}
    />
  );
};
