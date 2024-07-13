import { Request, Response } from "express";
import { getMealPlan } from "../dal/nutritionDal";

export const getNutritionMealPlan = async (req: Request, res: Response) => {
  try {
    const costumeMealPlan = await getMealPlan();
    res.json(costumeMealPlan);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
