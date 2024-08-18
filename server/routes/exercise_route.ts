import express from 'express';
import { checkAuth } from '../middlewares/auth_middleware';
import { ExercisesController } from '../controllers';

export const exercisesRouter = express.Router();

exercisesRouter.get('/exercises', checkAuth, ExercisesController.getUserExercises);
