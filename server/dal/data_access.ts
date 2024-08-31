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

const query = async (text: string, params: unknown[]): Promise<QueryResult<any>['rows']> => {
    const res = await pool.query(text, params);
    return convertKeysToCamelCase(res.rows);
};

export { pool, query };
