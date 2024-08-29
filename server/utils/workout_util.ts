import { Workout } from "../models/workout";

const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

export const scheduleWorkouts = (
    days: string[],
    workouts: Workout[],
    numberOfWorkoutAhead: number): Workout[] => {

    const today = new Date().getDay();

    const sortedDays = days.slice().sort((a, b) => {
        const dayIndexA = (daysOfWeek.indexOf(a) - today + 7) % 7;
        const dayIndexB = (daysOfWeek.indexOf(b) - today + 7) % 7;
        return dayIndexA - dayIndexB;
    });

    const workoutSchedule: Workout[] = [];

    for (let ahedIndex = 0; ahedIndex < numberOfWorkoutAhead; ahedIndex++) {
        const currentDay = new Date();
        currentDay.setDate(new Date().getDate() + ahedIndex);
        const currentDayName = daysOfWeek[currentDay.getDay()];

        const dayIndex = sortedDays.indexOf(currentDayName);

        if (dayIndex !== -1) {
            const workoutIndex = ahedIndex % workouts.length;
            workoutSchedule.push({ ...workouts[workoutIndex], date: currentDay.toDateString() });
        }
    }

    return workoutSchedule;
}