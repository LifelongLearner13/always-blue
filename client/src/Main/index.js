import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PrivateRoute from '../common/PrivateRoute';
import Header from '../Header';
import Profile from '../Profile';
import Loader from '../common/Loader';
import { loginProcessing } from '../Auth/actions';
import { isUserAuthenticated } from '../redux/stateSelectors';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }
  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.loginProcessing();
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header />
        <main style={{ display: 'flex' }}>
          <Switch>
            <PrivateRoute path={'/profile'} component={Profile} />
            <Route
              path={'/auth'}
              render={props => {
                // this.handleAuthentication(props);
                return <Loader text={'Authenticating'} />;
              }}
            />
            <Route
              path={'/'}
              render={props => {
                return <h1>Main</h1>;
              }}
            />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isUserAuthenticated: isUserAuthenticated(state),
  };
};

const mapDispatchToProps = dispatch => ({
  loginProcessing: () => dispatch(loginProcessing()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
