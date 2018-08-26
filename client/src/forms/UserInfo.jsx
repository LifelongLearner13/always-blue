import React, { Component } from 'react';
import { Field } from 'redux-form';
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
import { DialogContentText } from '@material-ui/core';

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

class UserInfo extends Component {
  state = {
    isPswdVisible: false
  };

  onMouseDownPswd = event => {
    event.preventDefault();
  };

  togglePswdVisibility = () => {
    this.setState(state => ({ isPswdVisible: !state.isPswdVisible }));
  };

  onCancel = () => {
    this.props.reset();
    this.props.onClose();
  };

  componentDidUpdate(prevProps) {
    console.log(`${this.props.title} !== ${prevProps.title}`);
    if (this.props.title !== prevProps.title) {
      console.log('UPDATE');
      this.props.reset();
    }
  }

  render() {
    let {
      classes,
      title,
      dialogText,
      submitText,
      isOpen,
      onClose,
      onSubmit,
      pristine,
      submitting
    } = this.props;
    let { isPswdVisible } = this.state;
    return (
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={onSubmit} className={classes.container}>
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          {dialogText && <DialogContentText>{dialogText}</DialogContentText>}
          <DialogContent className={classes.container}>
            <Field
              required={true}
              id={'email'}
              name={'email'}
              type={'text'}
              label={'email'}
              component={renderTextField}
            />
            <Field
              required={true}
              id={'password'}
              name={'password'}
              type={isPswdVisible ? 'text' : 'password'}
              label={'Password'}
              component={renderTextField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.togglePswdVisibility}
                      onMouseDown={this.onMouseDownPswd}
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
              onClick={this.onCancel}
              disabled={pristine || submitting}
              color={'secondary'}
            >
              Cancel
            </Button>
            <Button
              type={'submit'}
              disabled={pristine || submitting}
              color={'primary'}
            >
              {submitText}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(UserInfo);
