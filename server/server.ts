import { initApp } from './app';
import fs from 'fs';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

initApp().then((app) => {
    if (process.env.NODE_ENV === 'production') {
        console.log('server is running in production mode');
        const certs = {
            key: fs.readFileSync('./client-key.pem'),
            cert: fs.readFileSync('./client-cert.pem'),
        };
        https.createServer(certs, app).listen(port);
    } else {
        console.log('server is running in development mode');
        http.createServer(app).listen(port);
    }
});
