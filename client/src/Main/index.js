import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from '../common/PrivateRoute';
import Header from '../Header';
import Profile from '../Profile';

class Main extends Component {
  render() {
    console.log('match: ', this.props.match);
    return (
      <React.Fragment>
        <Header />
        <main>
          <Switch>
            <PrivateRoute path={'/profile'} component={Profile} />
            <Route />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default Main;
