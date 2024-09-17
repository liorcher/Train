import express from 'express';
import { checkAuth } from '../middlewares/auth_middleware';
import { UserController } from '../controllers';

export const userRouter = express.Router();

userRouter.get('/me', checkAuth, UserController.getCurrentUser);
userRouter.put('/weight', checkAuth, UserController.updateUserWeight);
