import { Pool, QueryResult } from 'pg';
import appConfig from '../configs/appConfig';
import { convertKeysToCamelCase } from '../utils/converstion_util';

const {
    db: { user, host, name, port },
} = appConfig;

const pool = new Pool({
    user,
    host,
    database: name,
    password: process.env.PG_PASSWORD,
    port,
    ssl: {
        rejectUnauthorized: false,
    },
});

const query = async (text: string, params: unknown[]): Promise<QueryResult<any>['rows']> => {
    const res = await pool.query(text, params);
    return convertKeysToCamelCase(res.rows);
};

export { pool, query };
