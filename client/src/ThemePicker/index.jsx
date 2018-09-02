import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/FaceOutlined';

const styles = theme => {
  console.log(theme);
  return {
    avatar: {
      margin: `${theme.spacing.unit * 6}px auto`,
      backgroundColor: theme.palette.primary,
      width: '60px',
      height: '60px'
    },
    avatarIcon: {
      width: '2.5em',
      height: '2.5em'
    },
    title: {}
  };
};

class ThemePicker extends Component {
  render() {
    const { classes } = this.props;
    console.log(classes);
    return (
      <React.Fragment>
        <Grid item xs={12} container spacing={24}>
          <Grid item xs={12}>
            <Typography
              align={'center'}
              headlineMapping={{ display2: 'h3' }}
              variant={'display2'}
              gutterBottom
            >
              Customize the Theme
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              align={'center'}
              headlineMapping={{ display2: 'h4' }}
              variant={'display1'}
              gutterBottom
            >
              Primary
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              align={'center'}
              headlineMapping={{ display2: 'h4' }}
              variant={'display1'}
              gutterBottom
            >
              Secondary
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ThemePicker);
