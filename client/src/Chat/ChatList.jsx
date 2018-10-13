import React, { Component, Fragment } from 'react';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const data = [
  {
    name: 'foo',
    time: '10:00 am',
    message:
      'hello jirtjiejlej jfoejfoejo3j jfojgoejgoejog jfojgoejgoej jeojeojgeo jfjwjfowj jfjjkj',
  },
  {
    name: 'bar',
    time: '10:01 am',
    message: 'hello',
  },
  {
    name: 'foo',
    time: '10:02 am',
    message: 'hello',
  },
];

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
  paper: {
    width: '80%',
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing.unit * 2,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    '& .left': {
      alignSelf: 'flex-start',
    },
    '& .right': {
      alignSelf: 'flex-end',
    },
  },
  item: {
    margin: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
  },
  chatItem: {
    margin: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    position: 'relative',
    maxWidth: '70%',
    '&::before': {
      content: '" "',
      position: 'absolute',
      top: -10,
      width: 0,
      height: 0,
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
    },
    '.left &': {
      background: theme.palette.secondary.light,
    },
    '.right &': {
      background: theme.palette.primary.light,
    },
    '.left &::before': {
      left: 5,
      borderBottom: `10px solid ${theme.palette.secondary.light}`,
    },
    '.right &::before': {
      right: 5,
      borderBottom: `10px solid ${theme.palette.primary.light}`,
    },
  },
});

class ChatList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <ol className={classes.list}>
            {data.map((el, idx) => (
              <li
                key={el.name}
                className={ClassNames(
                  classes.item,
                  idx % 2 === 0 ? 'left' : 'right'
                )}
              >
                <Typography>
                  {el.name} - {el.time}
                </Typography>
                <Paper className={classes.chatItem}>
                  <Typography>{el.message}</Typography>
                </Paper>
              </li>
            ))}
          </ol>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ChatList);
