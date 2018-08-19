const Router = require('express-promise-router');
const userModel = require('../db/user');

// Allows async functions as route handlers
const router = new Router();

router.get('/profile', async (request, response) => {
  const { email } = request.user;
  const result = await userModel.find(email);
  response.json(result);
});

router.put('/password-change', async (request, response) => {
  const { email } = request.user;
  const newPswd = request.body.password;
  const result = await userModel.updatePswd(email, newPswd);
  response.json(result);
});

router.delete('/delete', async (request, response) => {
  const { email } = request.user;
  const result = await userModel.del(email);
  response.json(result);
});

/* ---- User Preferences ---- */

/**
 * Retrieve preferences based on user's email
 */
router.get('/preferences', async (request, response) => {
  const { email } = request.user;
  const result = await userModel.findPref(email);
  response.json(result);
});

/**
 * Update a user's preferences
 */
router.put('/preferences', async (request, response) => {
  const { email } = request.user;
  const { preferences } = request.body;
  console.log('preferences sent: ', JSON.parse(preferences));
  const result = await userModel.updatePref(email, JSON.parse(preferences));
  response.json(result);
});

module.exports = router;
