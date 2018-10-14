import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './Main';

/**
 * Lays out the top level routes, these represent main types of pages. Also utilizes
 * Material UI's CssBaseline component to have a normalized styling environment.
 */
class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Switch>
          <Route component={Main} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
