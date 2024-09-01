import { initApp } from './app';
import fs from 'fs';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { checkDatabaseConnection } from './dal/data_access';

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

        app.get('*', (req, res) => {
            if (
                !req.path.startsWith('/auth') ||
                !req.path.startsWith('/user') ||
                !req.path.startsWith('/workout') ||
                !req.path.startsWith('/preferences') ||
                !req.path.startsWith('/test')
            ) {
                const filePath = `../client-static/dist${req.path === '/' ? '/index.html' : req.path}`;
                res.sendFile(path.resolve(filePath));
            }
        });
    } else {
        console.log('server is running in development mode');
        http.createServer(app).listen(port);
    }

    checkDatabaseConnection();
});
