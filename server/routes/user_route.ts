import express, { Request, Response, NextFunction } from 'express';
import { checkAuth } from '../middlewares/auth_middleware';
import { pool } from '../dal/data_access';

export const userRouter = express.Router();

userRouter.get('/', checkAuth, (req: Request, res: Response, next: NextFunction) => {
    pool.query('SELECT * FROM "trAIn".users ORDER BY user_id ASC', (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        res.status(200).json(results.rows);
    });
});
