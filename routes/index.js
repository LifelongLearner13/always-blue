/* eslint-env node */
const userPref = require('./preferences');

module.exports = app => {
  app.use('/api/preferences', userPref);
};
