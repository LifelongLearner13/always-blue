import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from './utils/history';
import configureStore from './redux';
import App from './App';
import DyThemeProvider from './ThemePicker/DyThemeProvider';
import initialState from './redux/initialState';

// Configure the Redux store
export const store = configureStore(initialState);

/**
 * Main entry point for the app, this component sets up the router, Redux, and the Material UI theme.
 */
const renderApp = () =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <DyThemeProvider>
          <App />
        </DyThemeProvider>
      </Router>
    </Provider>,
    document.getElementById('root')
  );

// Enable hot reloading when not in production
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

renderApp();
