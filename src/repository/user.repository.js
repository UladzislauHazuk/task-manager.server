const {
    pool
} = require('../DB');

const getUsersDB = async () => {
    const client = await pool.connect();
    const sql = 'SELECT * FROM users';
    const data = (await client.query(sql)).rows;
    return data;
};

const getUsersByIdDB = async (id) => {
    const client = await pool.connect();
    const sql = 'SELECT * FROM users WHERE id = $1';
    const data = (await client.query(sql, [id])).rows;
    return data;
};

const updateUsersDB = async (id, name, surname, pwd, email, status) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = 'UPDATE users SET name = $1, surname = $2, pwd = $3, email = $4, status = $5 WHERE id = $6 RETURNING *';
        const data = (await client.query(sql, [name, surname, pwd, email, status, id])).rows;
        await client.query('COMMIT');
        return data;
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error.message);
        return [];
    }
};

const deleteUserDB = async (id) => {
    const client = await pool.connect();
    try {
        client.query('BEGIN');
        const sql = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const data = (await client.query(sql, [id])).rows;
        client.query('COMMIT');
        return data;
    } catch (error) {
        client.query('ROLLBACK');
        console.log(error.message);
        return [];
    }
}

const patchUsersDB = async (id, dataFromClient) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const sql = `SELECT * FROM users WHERE id=$1`;
        const data = (await client.query(sql, [id])).rows[0];
        const merged = {
            ...data,
            ...dataFromClient
        };
        const sql2 = 'UPDATE users SET name=$1, surname=$2, email=$3, pwd=$4, status=$5 WHERE id=$6 RETURNING *';
        const data2 = (await client.query(sql2, [merged.name, merged.surname, merged.email, merged.pwd, merged.status, id])).rows;
        await client.query('COMMIT');
        return data2;
    } catch (error) {
        await client.query('ROLLBACK');
        console.log(error.message);
        return [];
    }
};

module.exports = {
    getUsersDB,
    getUsersByIdDB,
    updateUsersDB,
    deleteUserDB,
    patchUsersDB
};