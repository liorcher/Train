import express from 'express';
import { query } from '../dal/data_access';

export const testRouter = express.Router();

testRouter.get('/users', async (req, res) => {
    try {
        const result = await query('SELECT * FROM "trAIn".users', []);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).send('An error occurred while fetching users');
    }
});
