import request from 'supertest';
import { initApp } from '../app';
import { testUser } from './consts';
import { pool, query } from '../dal/data_access';

let app;

beforeAll(async () => {
    app = await initApp();
    await query('DELETE FROM "trAIn".users', []);
});

afterAll(async () => {
    await pool.end();
});

describe('Authentication', () => {
    test('register', async () => {
        const res = await request(app).post('/auth/register').send(testUser);
        expect(res.statusCode).toEqual(200);
    });

    test('login', async () => {
        const res = await request(app).post('/auth/login').send(testUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');

        testUser.accessToken = res.body.accessToken;
        testUser.refreshToken = res.body.refreshToken;
    });

    test('middleware', async () => {
        const res = await request(app).get('/user').send();
        expect(res.statusCode).not.toEqual(200);
        const res2 = await request(app)
            .get('/user')
            .set('Authorization', 'Bearer ' + testUser.accessToken)
            .send();
        expect(res2.statusCode).toEqual(200);
    });

    test('refresh token', async () => {
        await new Promise((resolve) => setTimeout(resolve, 8000));

        const res = await request(app)
            .get('/user')
            .set('Authorization', 'Bearer ' + testUser.accessToken)
            .send();

        expect(res.statusCode).not.toEqual(200);

        const res2 = await request(app)
            .get('/auth/refresh')
            .set('Authorization', 'Bearer ' + testUser.refreshToken)
            .send(testUser);

        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toHaveProperty('accessToken');
        expect(res2.body).toHaveProperty('refreshToken');
        testUser.accessToken = res2.body.accessToken;
        testUser.refreshToken = res2.body.refreshToken;

        const res3 = await request(app)
            .get('/user')
            .set('Authorization', 'Bearer ' + testUser.accessToken)
            .send();

        expect(res3.statusCode).toEqual(200);
    }, 10000);

    test('refresh token used twice', async () => {
        //get new refresh token with the refresh token
        const res = await request(app)
            .get('/auth/refresh')
            .set('Authorization', 'Bearer ' + testUser.refreshToken)
            .send();

        expect(res.statusCode).toEqual(200);
        const newRefreshToken = res.body.refreshToken;

        //try using the old refresh token again
        const res2 = await request(app)
            .get('/auth/refresh')
            .set('Authorization', 'Bearer ' + testUser.refreshToken)
            .send();

        expect(res2.statusCode).toEqual(403);

        // trying to use the new refresh token after it was removed
        const res3 = await request(app)
            .get('/auth/refresh')
            .set('Authorization', 'Bearer ' + newRefreshToken)
            .send();

        expect(res3.statusCode).toEqual(403);
    });

    test('logout', async () => {
        const res = await request(app).post('/auth/login').send(testUser);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');

        const res2 = await request(app)
            .get('/auth/logout')
            .set('Authorization', 'Bearer ' + res.body.refreshToken)
            .send();

        expect(res2.statusCode).toEqual(200);

        const res3 = await request(app)
            .get('/auth/refresh')
            .set('Authorization', 'Bearer ' + res.body.refreshToken)
            .send();

        expect(res3.statusCode).toEqual(403);
    });
});
