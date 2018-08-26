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

import AccountMenu from '../components/AccountMenu';
import UserInfo from '../forms/UserInfo';
import withFormName from '../forms/withFormName';

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

const LoginForm = withFormName('login', UserInfo);
const SignUpForm = withFormName('signUp', UserInfo);

class Header extends React.Component {
  state = {
    isLoginOpen: false,
    isSignUpOpen: false
  };

  openDialog = id => {
    this.setState({
      [id]: true
    });
  };

  closeDialog = id => {
    this.setState({
      [id]: false
    });
  };

  login = event => {
    event.preventDefault();
    console.log('loged in');
  };

  signUp = event => {
    event.preventDefault();
    console.log('sign up');
  };

  render() {
    const { classes, isUserAuthenticated } = this.props;
    const { isLoginOpen, isSignUpOpen } = this.state;

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
              openLogin={() => this.openDialog('isLoginOpen')}
              openSignUp={() => this.openDialog('isSignUpOpen')}
            />
          </Toolbar>
        </AppBar>
        {!isUserAuthenticated && (
          <React.Fragment>
            <LoginForm
              isOpen={isLoginOpen}
              onClose={() => this.closeDialog('isLoginOpen')}
              title={'Log In'}
              submitText={'Submit'}
              onSubmit={this.login}
            />
            <SignUpForm
              isOpen={isSignUpOpen}
              onClose={() => this.closeDialog('isSignUpOpen')}
              title={'Sign Up'}
              submitText={'Submit'}
              onSubmit={this.signUp}
            />
          </React.Fragment>
        )}
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

export default connect(mapStateToProps)(withStyles(styles)(Header));
