/* eslint-env node */
const Router = require('express-promise-router');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// create a new express-promise-router
// Same API as the normal express router except
// it allows async functions as route handlers
const router = new Router();

router.post(
  '/signup',
  async (request, response, next) => {
    passport.authenticate('signup', async (err, user, info) => {
      try {
        if (err) return next(err);
        if (!info.success) return response.json(info);

        request.login(user, { session: false }, async error => {
          if (error) return next(error);
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { email: user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user: body }, 'top_secret');
          //Send back the token to the user
          return response.json({ ...info, token });
        });
      } catch (error) {
        return next(error);
      }
    })(request, response, next);
  }
  //   passport.authenticate('signup', { session: false }),
  //   async (request, response) => {
  //     response.json(request.authInfo);
  //   }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return next(err);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, 'top_secret');
        //Send back the token to the user
        return res.json({ ...info, token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
