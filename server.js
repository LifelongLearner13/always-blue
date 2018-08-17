/* ---- Dependencies ---- */
const express = require('express');
const logger = require('morgan');
require('dotenv').config(); // Copy values from `.env` to `process.env`

/* ---- API Routes ---- */
const userPref = require('./api/preferences/');

/* ---- Initial Setup ---- */
const app = express();

// log every HTTP request to the console when in development
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Enable CORS from client-side
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

/* ---- Serve files/data ---- */

// When in Production serve static files. In development static files are
// are handled via webpack's dev server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use('/api/preferences', userPref);

/* ---- Set port and start server ---- */

const runServer = callback => {
  let port =
    process.env.NODE_ENV === 'production'
      ? process.env.PORT
      : process.env.DEVELOPMENT_PORT;

  const server = app.listen(port, () => {
    console.log('Node app is running on port', port);
    if (callback) {
      callback(server);
    }
  });
};

// If file is called directly, then run server.
// Allows for testing the code.
if (require.main === module) {
  runServer();
}

exports.app = app;
exports.runServer = runServer;
