import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import renderTextField from '../components/renderTextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'no-wrap',
    flexDirection: 'column'
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 'fill'
  }
});

class Login extends Component {
  state = {
    isPswdVisible: false
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  togglePswdVisibility = () => {
    this.setState(state => ({ isPswdVisible: !state.isPswdVisible }));
  };

  render() {
    let {
      classes,
      isLoginOpen,
      closeLogin,
      login,
      pristine,
      submitting
    } = this.props;
    let { isPswdVisible } = this.state;
    return (
      <Dialog
        open={isLoginOpen}
        onClose={closeLogin}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={login} className={classes.container}>
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent className={classes.container}>
            <Field
              required={true}
              id="email"
              name="email"
              type={'text'}
              label="Email"
              component={renderTextField}
            />
            <Field
              required={true}
              id="password"
              name="password"
              type={isPswdVisible ? 'text' : 'password'}
              label="Password"
              component={renderTextField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.togglePswdVisibility}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.isPswdVisible ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeLogin}
              disabled={pristine || submitting}
              color="error"
            >
              Cancel
            </Button>
            <Button
              type={'submit'}
              disabled={pristine || submitting}
              color="primary"
            >
              Log in
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default reduxForm({
  form: 'LoginForm' // a unique identifier for this form
})(withStyles(styles)(Login));
