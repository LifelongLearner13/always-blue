import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import materialUIColors from './materialUIColors';
import { getThemePrimary, getThemeSecondary } from '../redux/stateSelectors';

class DyThemeProvider extends Component {
  render() {
    const { primary, secondary } = this.props;
    const theme = {
      palette: {
        type: 'light',
        primary: materialUIColors[primary],
        secondary: materialUIColors[secondary],
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2
      },
      typography: {
        // Apply Material UI's default fonts to all text
        fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',')
      }
    };
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  primary: getThemePrimary(state),
  secondary: getThemeSecondary(state)
});

export default withRouter(connect(mapStateToProps)(DyThemeProvider));
