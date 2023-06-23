const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgress',
    password: process.env.POSTGRESS,
    host: 'localhost',
    port: '5432',
    database: 'QuantumQuorum'
});

module.exports = pool;