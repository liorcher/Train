export default {
    db: {
        user: 'avnadmin',
        host: 'train-2024-yaeltzahor110700-d411.f.aivencloud.com',
        name: process.env.DB_NAME || 'trAIn',
        port: parseInt(process.env.DB_PROT) || 19080,
        password: process.env.PG_PASSWORD,
    },
};
