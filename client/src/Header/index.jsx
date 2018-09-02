import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { isUserAuthenticated } from '../redux/stateSelectors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountMenu from './AccountMenu';
import { logoutRequesting } from '../LogIn/actions';

const styles = {
  header: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component {
  state = {};

  render() {
    const { classes, isUserAuthenticated, logoutRequesting } = this.props;

    return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Full Stack Template
            </Typography>
            <AccountMenu
              isUserAuthenticated={isUserAuthenticated}
              handleLogOut={logoutRequesting}
            />
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isUserAuthenticated: isUserAuthenticated(state)
  };
};

const mapDispatchToProps = dispatch => ({
  logoutRequesting: () => dispatch(logoutRequesting())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Header));
