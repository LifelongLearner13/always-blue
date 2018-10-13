import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import PrivateRoute from '../common/PrivateRoute';
import Header from '../Header';
import Profile from '../Profile';
import { loginProcessing } from '../LogIn/actions';
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
        <Grid container spacing={24} component={'main'} direction={'column'}>
          <Switch>
            <PrivateRoute path={'/profile'} component={Profile} />
            <Route
              path={'/auth'}
              render={props => {
                this.handleAuthentication(props);
                return <h1>Loading ...</h1>;
              }}
            />
            <Route
              path={'/'}
              render={props => {
                return <h1>Main</h1>;
              }}
            />
          </Switch>
        </Grid>
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
