interface Workout {
    userId: string;
    title: string;
    duration: number;
    exercises: Exercise[];
    calories_burned: number;
    date: string;
    isDeleted: boolean;
}

type Exercise = {
    name: string;
    sets: number;
    mainWorkingMuscle: string;
    rest: string;
    description: string;
    link: string;
};

export { Workout };
