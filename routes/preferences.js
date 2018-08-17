/* eslint-env node */
const Router = require('express-promise-router');
const jsonParser = require('body-parser').json();

const db = require('../db'); // Postgres database connection

// create a new express-promise-router
// Same API as the normal express router except
// it allows async functions as route handlers
const router = new Router();

/**
 * Retrieve preferences based on user's email
 */
router.get('/:email', async (request, response) => {
  const { email } = request.params;
  console.log(email);
  const { rows } = await db.query(
    'SELECT * FROM public."USER" WHERE email = $1',
    [email]
  );
  response.json({ user: rows[0] });
});

/**
 * Creat user preferences based on user's email
 */
router.post('/:email', jsonParser, async (request, response) => {
  const { email } = request.params;
  response.json({ user: email });
});

/**
 * Creat user preferences based on user's email
 */
router.put('/:email', jsonParser, async (request, response) => {
  const { email } = request.params;
  response.json({ user: email });
});

/**
 * Remove user preferences based on user's email
 */
router.delete('/:email', async (request, response) => {
  const { email } = request.params;
  response.json({ user: email });
});

// export router to be mounted by the parent application
module.exports = router;
