import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/FaceOutlined';
import ThemePicker from '../ThemePicker';

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

class Profile extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid item xs={12}>
          <Avatar className={classes.avatar}>
            <FaceIcon className={classes.avatarIcon} />
          </Avatar>
          <Typography
            align={'center'}
            headlineMapping={{ display3: 'h2' }}
            variant={'display3'}
            gutterBottom
          >
            Profile
          </Typography>
        </Grid>
        <ThemePicker />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Profile);
