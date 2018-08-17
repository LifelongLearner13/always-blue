/* eslint-env node */
const userPref = require('./preferences');
const auth = require('./auth');

module.exports = (app, passport) => {
  app.use('/api/auth', auth);
  app.use('/api/preferences', userPref);
};
