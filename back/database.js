const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgress',
    password: 'Naruto',
    host: 'localhost',
    port: '5432',
    database: 'QuantumQuorum'
});

module.exports = pool;