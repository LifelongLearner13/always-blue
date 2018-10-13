import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import Face from '@material-ui/icons/Face';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    '&:hover': {
      backgroundColor: theme.palette.secondary[100],
      color: theme.palette.getContrastText(theme.palette.secondary[100]),
    },
    '&:focus': {
      backgroundColor: theme.palette.secondary[100],
      color: theme.palette.getContrastText(theme.palette.secondary[100]),
    },
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

class HeaderActions extends Component {
  render() {
    const {
      classes,
      handleLogin,
      handleLogOut,
      isAuthenticated,
      history,
      location,
    } = this.props;

    return (
      <div>
        {isAuthenticated ? (
          <Fragment>
            <Button
              variant={'contained'}
              color={'secondary'}
              className={classes.button}
              disabled={location.pathname === '/profile'}
              onClick={() => history.push('/profile')}
            >
              <Face />
              Profile
            </Button>
            <Button
              variant={'contained'}
              color={'secondary'}
              className={classes.button}
              onClick={() => handleLogOut()}
            >
              <LockOpen />
              Log Out
            </Button>
          </Fragment>
        ) : (
          <Button
            variant={'contained'}
            color={'secondary'}
            className={classes.button}
            onClick={() => handleLogin()}
          >
            <Lock className={classes.icon} />
            Log In
          </Button>
        )}
      </div>
    );
  }
}

HeaderActions.propTypes = {
  isAuthenticated: PropTypes.string,
  handleLogin: PropTypes.func,
  handleLogOut: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(withStyles(styles)(HeaderActions));
