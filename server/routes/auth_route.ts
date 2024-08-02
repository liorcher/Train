import express from 'express';
import { AuthController } from '../controllers';

export const authRouter = express.Router();

authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.get('/refresh', AuthController.refresh);

authRouter.get('/logout', AuthController.logout);
