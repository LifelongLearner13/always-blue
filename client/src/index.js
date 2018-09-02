import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './redux';
import App from './App';
import DyThemeProvider from './ThemePicker/DyThemeProvider';
import initialState from './redux/initialState';

import './styles/index.css';

const store = configureStore(initialState);

const renderApp = () =>
  render(
    <Provider store={store}>
      <Router>
        <DyThemeProvider>
          <App />
        </DyThemeProvider>
      </Router>
    </Provider>,
    document.getElementById('root')
  );

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

renderApp();
