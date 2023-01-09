const { pool } = require('../DB');

const getUserByEmailDB = async email => {
  const client = await pool.connect();
  const sql = 'SELECT * FROM users WHERE email = $1';
  const data = (await client.query(sql, [email])).rows;
  return data;
};

const createUserDB = async (name, surname, email, pwd) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const sql = 'INSERT INTO users (name, surname, email, pwd) VALUES ($1, $2, $3, $4)';
    await client.query(sql, [name, surname, email, pwd]);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.log(error.message);
    return [];
  }
};

const checkUserByPwdDB = async (pwd, email) => {
  const client = await pool.connect();
  const sql = 'SELECT pwd FROM users WHERE email = $1';
  const data = (await client.query(sql, [email])).rows[0];
  return data.pwd;
};

module.exports = {
  getUserByEmailDB,
  createUserDB,
  checkUserByPwdDB,
};
