interface Workout {
    userId: string;
    title: string;
    duration: number;
    exercises: [];
    calories_burned: number;
    date: string;
    isDeleted: boolean;
}

export { Workout };
