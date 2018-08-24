if (process.env.NODE_ENV === 'production') {
  console.warn('Production Build');
  module.exports = require('./configureStore.prod');
} else {
  console.warn('Development Build');
  module.exports = require('./configureStore.dev');
}
