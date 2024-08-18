import express from 'express';
import { checkAuth } from '../middlewares/auth_middleware';
import { WorkoutsController } from '../controllers';

export const workoutsRouter = express.Router();

workoutsRouter.get('/workouts', checkAuth, WorkoutsController.getUserWorkouts);
workoutsRouter.post('/newWorkoutPlan', checkAuth, WorkoutsController.createUserWorkoutPlan);
