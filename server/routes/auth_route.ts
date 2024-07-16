import express from 'express';
import { default as AuthController } from '../controllers/auth_controller';

export const authRouter = express.Router();

authRouter.post('/register', AuthController.register);

authRouter.post('/login', AuthController.login);

authRouter.get('/refresh', AuthController.refresh);

authRouter.get('/logout', AuthController.logout);
