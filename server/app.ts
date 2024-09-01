import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth_route';
import { userRouter } from './routes/user_route';
import { preferencesRouter } from './routes/preferences_route';
import { workoutsRouter } from './routes/workouts_route';
import { cors } from './middlewares/cors_middleware';
import { testRouter } from './routes/test_route';

const app = express();

export const initApp = async (): Promise<Express> => {
    const promise = new Promise<Express>((resolve) => {
        app.use(cors);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use('/test', testRouter);
        app.use('/auth', authRouter);
        app.use('/user', userRouter);
        app.use('/workout', workoutsRouter);
        app.use('/preferences', preferencesRouter);
        resolve(app);
    });

    return promise;
};
