/* eslint-env node */
const Router = require('express-promise-router');
const passport = require('passport');

// create a new express-promise-router
// Same API as the normal express router except
// it allows async functions as route handlers
const router = new Router();

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (request, response, next) => {
    response.json({
      message: 'Signup successful',
      user: request.user
    });
    next();
  }
);

module.exports = router;
