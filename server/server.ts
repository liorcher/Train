import { initApp } from './app';
import fs from 'fs';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { checkDatabaseConnection } from './dal/data_access';

dotenv.config();

const port = parseInt(process.env.PORT as string, 10) || 9000;
const hostname = '0.0.0.0';

initApp().then((app) => {
    if (process.env.NODE_ENV === 'production') {
        console.log('server is running in production mode');
        const certs = {
            key: fs.readFileSync('./client-key.pem'),
            cert: fs.readFileSync('./client-cert.pem'),
        };

        https.createServer(certs, app).listen(port, hostname);
    } else {
        console.log('server is running in development mode');

        http.createServer(app).listen(port, hostname);
    }

    checkDatabaseConnection();
});
