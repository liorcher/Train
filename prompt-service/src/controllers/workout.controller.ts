import { Request, Response } from "express";
import { getWorkoutPlan } from "../dal/workout.dal";

export const getNewWorkoutPlan = async (req: Request, res: Response) => {
  const userPreferences = "i want to do only two workouts per week";

  try {
    const newWorkoutPlan = await getWorkoutPlan(userPreferences);
    res.json(newWorkoutPlan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
