import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderActions from './HeaderActions';
import { isUserAuthenticated } from '../redux/stateSelectors';
import { loginRequesting, logoutRequesting } from '../Auth/actions';
import MainMenu from './MainMenu';

const styles = {
  header: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  state = {
    isMenuOpen: false,
  };

  handleMenuClose = () => {
    this.setState({
      isMenuOpen: false,
    });
  };

  handleMenuOpen = () => {
    this.setState({
      isMenuOpen: true,
    });
  };

  render() {
    const {
      classes,
      isUserAuthenticated,
      loginRequesting,
      logoutRequesting,
    } = this.props;
    const { isMenuOpen } = this.state;
    return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <MainMenu
              isOpen={isMenuOpen}
              handleClose={this.handleMenuClose}
              isAuthenticated={isUserAuthenticated}
            />
            <Typography
              variant="headline"
              color="inherit"
              className={classes.flex}
            >
              Always Blue
            </Typography>
            <HeaderActions
              isAuthenticated={isUserAuthenticated}
              handleLogin={loginRequesting}
              handleLogOut={logoutRequesting}
            />
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    isUserAuthenticated: isUserAuthenticated(state),
  };
};

const mapDispatchToProps = dispatch => ({
  loginRequesting: () => dispatch(loginRequesting()),
  logoutRequesting: () => dispatch(logoutRequesting()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
