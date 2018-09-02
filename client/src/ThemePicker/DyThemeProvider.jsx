import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

class DyThemeProvider extends Component {
  render() {
    let theme = {
      palette: {
        primary: green,
        secondary: indigo,
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2
      }
    };
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

export default withRouter(connect(mapStateToProps)(DyThemeProvider));
