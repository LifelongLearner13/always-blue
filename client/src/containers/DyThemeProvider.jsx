import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

class DyThemeProvider extends Component {
  render() {
    let theme = createMuiTheme({
      palette: {
        primary: purple,
        secondary: green
      },
      status: {
        danger: 'orange'
      }
    });
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.theme
  };
};

export default connect(mapStateToProps)(DyThemeProvider);
