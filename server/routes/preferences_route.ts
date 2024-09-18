import express from 'express';
import { checkAuth } from '../middlewares';
import { PreferencesController } from '../controllers';

export const preferencesRouter = express.Router();

preferencesRouter.get('/', checkAuth, PreferencesController.getUserPreferences);
preferencesRouter.post('/', checkAuth, PreferencesController.saveUserPreferences);
