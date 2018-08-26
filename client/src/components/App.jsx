import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../containers/Header';
import logo from '../img/logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route component={Header} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </React.Fragment>
    );
  }
}

export default App;
