import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { authRouter } from './routes/auth_route';
import { userRouter } from './routes/user_route';
import { preferencesRouter } from './routes/preferences_route';
import { workoutsRouter } from './routes/workouts_route';
import { cors } from './middlewares/cors_middleware';
import { testRouter } from './routes/test_route';
import path from 'path';

const app = express();

export const initApp = async (): Promise<Express> => {
    const promise = new Promise<Express>((resolve) => {
        // Middlewares
        app.use(cors);
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // Static files middleware
        app.use(express.static(path.join(__dirname, '../public')));

        // Routes
        app.use('/test', testRouter);
        app.use('/auth', authRouter);
        app.use('/user', userRouter);
        app.use('/workout', workoutsRouter);
        app.use('/preferences', preferencesRouter);

        // Catch-all handler for React Router
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public', 'index.html'));
        });

        resolve(app);
    });

    return promise;
};
