export default {
    db: {
        user: 'avnadmin',
        host: process.env.DB_HOST || '10.10.248.143',
        name: process.env.DB_NAME || 'trAIn',
        port: parseInt(process.env.DB_PROT) || 19080,
        password: process.env.PG_PASSWORD,
    },
};
