const db = require('../db'); // Postgres database connection
const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = process.env;

const save = async (email, password) => {
  console.log('user save: ', email, password);
  const hashedPswd = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
    'INSERT INTO public."USER"(email, password) VALUES($1, $2) RETURNING *',
    [email, hashedPswd]
  );
  console.log('rows: ', rows);
  return rows[0];
};

module.exports = {
  save
};
