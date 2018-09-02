import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Lock from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import grey from '@material-ui/core/colors/grey';
import {
  isUserAuthenticated,
  isLogInRequesting
} from '../redux/stateSelectors';
import { loginRequest } from './actions';
import EmailPswdForm from '../common/EmailPswdForm';

const styles = theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: grey[300] // #E0E0E0
  },
  paper: {
    margin: `${theme.spacing.unit * 8}px ${theme.spacing.unit * 3}px 0`,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
});

class LogIn extends Component {
  submitCallback = formData => {
    this.props.loginRequest(formData);
  };

  render() {
    const { classes, handleSubmit, isAuthenticated } = this.props;
    return isAuthenticated ? (
      <Redirect to="/profile" />
    ) : (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <EmailPswdForm
            handleSubmit={handleSubmit(this.submitCallback)}
            headLine={'Log In'}
            buttonText={'Submit'}
            AvatarIcon={Lock}
            owner={'LOGIN'}
          />
        </Paper>
      </main>
    );
  }
}

LogIn.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: isUserAuthenticated(state),
    isRequesting: isLogInRequesting(state)
  };
};

const mapDispatchToProps = dispatch => ({
  loginRequest: data => dispatch(loginRequest(data))
});

const Form = reduxForm({
  form: 'LogIn'
})(withStyles(styles)(LogIn));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
