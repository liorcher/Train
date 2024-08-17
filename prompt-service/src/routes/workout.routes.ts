import { Router } from "express";
import { getNewWorkoutPlan } from "../controllers/workout.controller";
import validate from "../middleware/validate.middleware";
import { workoutPlanSchema } from "../schemas/workoutSchema";

const router = Router();

router.post("/plan", validate(workoutPlanSchema), getNewWorkoutPlan);

export default router;