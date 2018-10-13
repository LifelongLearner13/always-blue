import React from 'react';
import withStyle from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    height: '70vh',
    maxWidth: '100%',
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.primary.dark,
  },
});

const Loader = ({ classes, text }) => {
  return (
    <div className={classes.root}>
      <Typography>{text}</Typography>
      <CircularProgress className={classes.progress} thickness={7} />
    </div>
  );
};

export default withStyle(styles)(Loader);
