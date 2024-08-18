import { Request, Response } from "express";
import { getWorkoutPlan } from "../dal/workout.dal";
import { userPreferences } from "../models/userPreferences.model";

/**
 * Handles the creation of a new workout plan based on user preferences.
 * 
 * This function extracts user preferences from the request body, including age, weight,
 * height, gender, activity level, target weight, goals, and workout duration. It then
 * calls a helper function `getWorkoutPlan` to generate a workout plan tailored to these
 * preferences and returns the plan in the response.
 * 
 * @param req - The HTTP request object. Expects a JSON body containing the following optional fields:
 *    - `age` (number, example: 18): The age of the user.
 *    - `weight` (number, example: 70): The current weight of the user in kilograms.
 *    - `height` (number, example: 1.75): The height of the user in meters.
 *    - `gender` (string, example: 'male'): The gender of the user.
 *    - `activity_level` (string, example: 'very active'): The user's activity level.
 *    - `target_weight` (number, example: 65): The target weight of the user in kilograms.
 *    - `user_goals` (string[], example: ['gain muscle', 'be more active', 'loose weight']): The user's fitness goals.
 *    - `workout_duration_in_minutes` (string, example: '90'): The duration of the workout in minutes.
 * 
 * @param res - The HTTP response object. Returns a JSON response containing an array of `Workout` objects:
 *    - `Workout[]`: An array of workout plans.
 *      - `title` (string): The title of the workout.
 *      - `duration` (number): The duration of the workout in minutes.
 *      - `exercises` (Exercise[]): An array of exercises included in the workout.
 * 
 * @throws 500 - If there is an error during the generation of the workout plan, a 500 status code is returned
 *              with an error message.
 */
export const getNewWorkoutPlan = async (req: Request, res: Response) => {
  const {
    age,
    weight,
    height,
    gender,
    activity_level,
    target_weight,
    user_goals,
    workout_duration_in_minutes } = req.body

  const preferences: userPreferences = {
    age,
    weight,
    height,
    gender,
    activity_level,
    target_weight,
    user_goals,
    workout_duration_in_minutes
  }

  try {
    const newWorkoutPlan = await getWorkoutPlan(preferences);

    res.json(newWorkoutPlan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
