/* eslint-env node */
const express = require('express');
const jsonParser = require('body-parser').json();
// const queries = require('../db/queries');

// Postgres database connection
// const db = require('../pg_setup');

const router = express.Router();

/**
 * Retrieve preferences based on user id
 */
router.get('/:id', (request, response) => {
  const userID = request.params.id;
  response.json({ user: userID });
});

/**
 * Creat user preferences based on user id
 */
router.post('/:id', jsonParser, (request, response) => {
  const userID = request.params.id;
  response.json({ user: userID });
});

/**
 * Creat user preferences based on user id
 */
router.put('/:id', jsonParser, (request, response) => {
  const userID = request.params.id;
  response.json({ user: userID });
});

/**
 * Remove user preferences based on user id
 */
router.delete('/:id', (request, response) => {
  const userID = request.params.id;
  response.json({ user: userID });
});

module.exports = router;
