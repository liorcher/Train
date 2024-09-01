import { Pool, QueryResult } from 'pg';
import appConfig from '../configs/appConfig';
import { convertKeysToCamelCase } from '../utils/convertion_util';

const {
    db: { user, host, name, port, password },
} = appConfig;

const pool = new Pool({
    user,
    host,
    database: name,
    password,
    port,
    ssl: {
        rejectUnauthorized: false,
    },
});

const checkDatabaseConnection = async (): Promise<void> => {
    try {
        // Try to connect and execute a simple query
        const client = await pool.connect();
        console.log('Connected to the database successfully');
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the process with an error code
    }
};

const query = async (text: string, params: unknown[]): Promise<QueryResult<any>['rows']> => {
    const res = await pool.query(text, params);
    return convertKeysToCamelCase(res.rows);
};

export { pool, query, checkDatabaseConnection };
