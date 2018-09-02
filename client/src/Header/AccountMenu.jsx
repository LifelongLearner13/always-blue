import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class AccountMenu extends Component {
  state = {
    anchorEl: null
  };

  onMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onMenuClose = event => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    this.onMenuClose();
    this.props.handleLogOut();
  };

  render() {
    const { isUserAuthenticated } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const menuContent = isUserAuthenticated
      ? [
          <MenuItem key={'profile'} onClick={this.onMenuClose}>
            <NavLink to={'/profile'}>Profile</NavLink>
          </MenuItem>,
          <MenuItem key={'logOut'} onClick={this.onMenuClose}>
            <NavLink to={'/'} onClick={this.handleLogOut}>
              Log Out
            </NavLink>
          </MenuItem>
        ]
      : [
          <MenuItem key={'logIn'}>
            <NavLink to={'/login'}>Log In</NavLink>
          </MenuItem>,
          <MenuItem key={'signUp'}>
            <NavLink to={'/signup'}>Sign Up</NavLink>
          </MenuItem>
        ];
    return (
      <div>
        <IconButton
          aria-owns={open ? 'account-menu' : null}
          aria-haspopup="true"
          onClick={this.onMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.onMenuClose}
        >
          {menuContent}
        </Menu>
      </div>
    );
  }
}

AccountMenu.propTypes = {
  isUserAuthenticated: PropTypes.string
};

export default AccountMenu;
