const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'avnadmin',
  host: 'train-2024-yaeltzahor110700-d411.f.aivencloud.com',
  database: 'trAIn',
  password: process.env.PG_PASSWORD,
  port: 19080,
});

module.exports = pool;