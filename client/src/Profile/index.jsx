import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/FaceOutlined';
import ThemePicker from '../ThemePicker';
import { getUserProfile } from '../redux/stateSelectors';

const styles = theme => ({
  avatar: {
    margin: `${theme.spacing.unit * 6}px auto`,
    backgroundColor: theme.palette.primary.main,
    width: 100,
    height: 100,
  },
  avatarIcon: {
    width: '100%',
    height: '100%',
  },
  section: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '80%',
    margin: '0 auto',
  },
  sectionTitle: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Profile extends Component {
  render() {
    const { classes, profile } = this.props;
    let { name, picture } = profile.user;

    return (
      <Fragment>
        <Grid item xs={12} component={'section'}>
          <Avatar className={classes.avatar} src={picture || null}>
            {picture ? null : <FaceIcon className={classes.avatarIcon} />}
          </Avatar>
          <Typography
            align={'center'}
            component={'h2'}
            variant={'display1'}
            gutterBottom
          >
            Profile
          </Typography>
        </Grid>
        <Grid item xs={12} component={'section'}>
          <Paper className={classes.section} elevation={1}>
            <Typography
              variant="title"
              component="h3"
              className={classes.sectionTitle}
            >
              Account Details
            </Typography>
            <Grid container spacing={24} justify={'center'}>
              <Grid item xs={5}>
                <Typography component={'p'} variant={'subheading'}>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography component={'p'} variant={'subheading'}>
                  {name}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <ThemePicker />
      </Fragment>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: getUserProfile(state),
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
