let CONNECT_URL = '';

if (process.env.DEVELOPMENT) {
  CONNECT_URL = process.env.DEVELOPE_DB_URL;
} else {
  CONNECT_URL = process.env.DATABASE_URL;
}

const pgp = require('pg-promise')();

// Limit the number of connections
pgp.pg.defaults.poolSize = 20;
console.log('database is connecting to', CONNECT_URL);
module.exports = pgp(CONNECT_URL);
