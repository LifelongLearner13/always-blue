/* eslint-env node */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const mountAPIRoutes = require('./utils/mountAPIRoutes');
const mountErrorHandler = require('./utils/errorHandlers');
const mount404 = require('./utils/404Handler');
const mountAuth = require('./auth/middleware');
const bot = require('./bot');
const response = require('./bot_response');

/* ---- Initial Setup ---- */
const app = express();

// Parse all request bodies to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

  // The Fetch API does not send Authentication headers with OPTION requests
  // This allows the OPTIONS request to complete successfully without requiring
  // authentication.
  if (req.method === 'OPTIONS') {
    res.end();
  } else {
    next();
  }
});

/* ---- Serve files/data ---- */

// When in Production serve static files. In development static files are
// are handled via Webpack's dev server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Must come right before the error handlers
mount404(app);

// Must be the last thing mounted
mountErrorHandler(app);

/* ---- Set port and start server ---- */

const runServer = callback => {
  let port =
    process.env.NODE_ENV === 'production'
      ? process.env.PORT
      : process.env.DEVELOPMENT_PORT;

  const server = app.listen(port, () => {
    console.log(
      `Node app is running on port: ${port} with environment: ${
        process.env.NODE_ENV
      }`
    );
    if (callback) {
      callback(server);
    }
  });
};

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  const greetingMsg = bot.getGreeting();
  console.log(greetingMsg);
  socket.emit('bot msg', greetingMsg);
  socket.on('new message', userMsg => {
    console.log(userMsg);
    // send data to chatbot class
    let msg = bot.getMessage(userMsg.message).then(entity => {
      if (!entity[0] in response) {
        let arr = response['none'];
        let idx = Math.floor(Math.random() * arr.length);
        return arr[idx];
      }
      let arr = response[entity[0]][entity[1]];
      let idx = Math.floor(Math.random() * arr.length);
      const msg = arr[idx];
      console.log('*****');
      console.log(msg);
      console.log('*****');
      socket.emit('bot msg', [msg]);
    });
  });
});

http.listen(4000, function() {
  console.log('listening on *:4000');
});

exports.app = app;
exports.runServer = runServer;
