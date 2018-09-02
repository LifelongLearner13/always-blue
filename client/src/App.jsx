import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Main from './Main';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Switch>
          <Route path={'/signup'} component={SignUp} />
          <Route path={'/login'} component={LogIn} />
          <Route component={Main} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
