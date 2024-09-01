import dotenv from 'dotenv';
dotenv.config();

export default {
    db: {
        user: 'postgres',
        host: process.env.DB_HOST || '10.10.248.143',
        name: process.env.DB_NAME || 'trAIn',
        port: parseInt(process.env.DB_PROT) || 5432,
        password: process.env.PG_PASSWORD,
    },
};
