const {
    Pool
} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'task_manager',
    password: '22662266',
    port: '5433'
});

module.exports = {
    pool
};