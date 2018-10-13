import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Lock from '@material-ui/icons/Lock';
import Face from '@material-ui/icons/Face';
import Auth from '../utils/Auth';

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

const auth = new Auth();

/**
 * Dropdown menu for account based actions. Options change depending on the
 * authentication status.
 * @param {Object} props - All the properties passed into the component
 * @param {string} props.isAuthenticated - Truthy value if user is authenticated, false otherwise
 * @param {Function} props.handleLogOut - Callback to execute when user logs out.
 */
class AccountMenu extends Component {
  render() {
    const { classes, isAuthenticated } = this.props;

    return (
      <div>
        <Button
          variant={'contained'}
          color={'secondary'}
          className={classes.button}
          onClick={() => auth.login()}
        >
          <Lock className={classes.icon} />
          Log In
        </Button>
        <Button
          variant={'contained'}
          color={'secondary'}
          className={classes.button}
        >
          <Face className={classes.icon} />
          Sign Up
        </Button>
      </div>
    );
  }
}

AccountMenu.propTypes = {
  isAuthenticated: PropTypes.string,
  handleLogOut: PropTypes.func,
};

export default withStyles(styles)(AccountMenu);
