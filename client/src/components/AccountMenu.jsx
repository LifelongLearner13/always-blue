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

  onOpenLogin = event => {
    this.onMenuClose();
    this.props.openLogin();
  };

  onOpenSignUp = event => {
    this.onMenuClose();
    this.props.openSignUp();
  };

  render() {
    const { isUserAuthenticated } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const menuContent = isUserAuthenticated
      ? [
          <MenuItem key={'account'} onClick={this.onMenuClose}>
            <NavLink to={'/account'}>Account</NavLink>
          </MenuItem>,
          <MenuItem key={'logOut'} onClick={this.onMenuClose}>
            <NavLink to={'/'}>Log Out</NavLink>
          </MenuItem>
        ]
      : [
          <MenuItem key={'logIn'} onClick={this.onOpenLogin}>
            Log In
          </MenuItem>,
          <MenuItem key={'signUp'} onClick={this.onOpenSignUp}>
            Sign Up
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

export default AccountMenu;
