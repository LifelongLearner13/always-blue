const db = require('../db'); // Postgres database connection
const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = process.env;

const isValidPassword = async (user, enteredPswd) => {
  const compare = await bcrypt.compare(enteredPswd, user.password);
  return compare;
};

const save = async (email, password) => {
  const hashedPswd = await bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS));

  try {
    const { rows } = await db.query(
      'INSERT INTO public."USER"(email, password) VALUES($1, $2) RETURNING email, preferences',
      [email, hashedPswd]
    );

    return {
      success: true,
      email,
      message: 'User Successfully created.',
      user: rows[0]
    };
  } catch (err) {
    if (err.code === '23505') {
      return {
        success: false,
        email,
        message: 'User already exists.'
      };
    }
    throw err;
  }
};

const find = async email => {
  const { rows } = await db.query(
    'SELECT email, preferences FROM public."USER" WHERE email = $1',
    [email]
  );

  const user = rows[0];

  if (!user) {
    return {
      success: false,
      email,
      message: 'Email is not recognized.'
    };
  }

  return {
    success: true,
    email,
    message: '',
    user: rows[0]
  };
};

const del = async email => {
  const { rows } = await db.query(
    'DELETE FROM public."USER" WHERE email = $1',
    [email]
  );

  return {
    success: true,
    email,
    message: `User ${email} was successfully deleted.`
  };
};

const updatePswd = async (email, newPswd) => {
  return (async () => {
    const client = await db.pool.connect();

    try {
      await client.query('BEGIN');
      const { rows } = await client.query(
        'SELECT * FROM public."USER" WHERE email = $1',
        [email]
      );

      const oldPswd = rows[0].password;

      const isSamePswd = await bcrypt.compare(newPswd, oldPswd);

      if (isSamePswd) {
        return {
          success: false,
          email,
          message:
            'Password not changed. Entered value was the same as current password'
        };
      }

      newPswd = await bcrypt.hash(newPswd, parseInt(BCRYPT_SALT_ROUNDS));

      await client.query(
        'UPDATE public."USER" SET password = $2 WHERE email = $1',
        [email, newPswd]
      );
      await client.query('COMMIT');

      return {
        success: true,
        email,
        message: 'Password successfully changed.'
      };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  })().catch(err => {
    console.error(err.stack);
    return {
      success: false,
      email,
      message: 'Something went wrong, please try again.'
    };
  });
};

const findPref = async email => {
  const { rows } = await db.query(
    'SELECT preferences FROM public."USER" WHERE email = $1',
    [email]
  );

  return {
    success: true,
    email,
    message: 'Preferences successfully found',
    preferences: rows[0].preferences ? rows[0].preferences : {}
  };
};

const updatePref = async (email, newPref) => {
  return (async () => {
    const client = await db.pool.connect();

    try {
      await client.query('BEGIN');
      const { rows } = await client.query(
        'SELECT preferences FROM public."USER" WHERE email = $1',
        [email]
      );

      const oldPref = rows[0].preferences ? rows[0].preferences : {};
      const mergedPref = { ...oldPref, ...newPref };

      const result = await client.query(
        'UPDATE public."USER" SET preferences = $2 WHERE email = $1 RETURNING preferences',
        [email, mergedPref]
      );
      await client.query('COMMIT');

      return {
        success: true,
        email,
        message: 'Preferences successfully changed.',
        preferences: result.rows[0].preferences
          ? result.rows[0].preferences
          : {}
      };
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack));
};

module.exports = {
  save,
  find,
  updatePswd,
  del,
  isValidPassword,
  findPref,
  updatePref
};
