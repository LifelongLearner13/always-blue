import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isUserAuthenticated } from '../redux/stateSelectors';

const ProtectedRoute = ({
  component: Component,
  render,
  isUserAuthenticated,
  ...rest
}) => {
  if (isUserAuthenticated) {
    if (render) {
      return <Route {...rest} render />;
    } else {
      return <Route {...rest} render={props => <Component {...props} />} />;
    }
  } else {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { loginModle: true, from: props.location }
        }}
      />
    );
  }
};

const mapStateToProps = state => {
  return {
    isUserAuthenticated: isUserAuthenticated(state)
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
