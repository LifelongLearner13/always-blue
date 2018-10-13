import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { loginRequesting } from '../Auth/actions';
import { isUserAuthenticated } from '../redux/stateSelectors';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  login,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      delete rest.to; // clean up rest, so we can pass it along to the child component
      return isAuthenticated ? (
        <Component {...props} {...rest} />
      ) : (
        // If user is not authenticated initiate login
        login(props.location) && null
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func,
  rest: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    isAuthenticated: isUserAuthenticated(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: path => dispatch(loginRequesting(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
