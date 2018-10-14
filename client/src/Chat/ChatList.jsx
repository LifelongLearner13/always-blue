import React, { Component } from 'react';
import ClassNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/FaceOutlined';
import blue from '@material-ui/core/colors/blue';
import { connect } from 'react-redux';

const data = [
  {
    type: 'bot',
    time: '10:00 am',
    message:
      'hello jirtjiejlej jfoejfoejo3j jfojgoejgoejog jfojgoejgoej jeojeojgeo jfjwjfowj jfjjkj',
  },
  {
    type: 'user',
    time: '10:01 am',
    message: 'hello',
  },
  {
    type: 'bot',
    time: '10:02 am',
    message: 'hello',
  },
];

const styles = theme => ({
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
    flexDirection: 'row',
    alignItems: 'center',
    '&.right': {
      flexDirection: 'row-reverse',
    },
  },
  botAvatar: {
    backgroundColor: blue[400],
  },
  chatItem: {
    margin: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    position: 'relative',
    maxWidth: '70%',
    '&::before': {
      content: '" "',
      position: 'absolute',
      width: 0,
      height: 0,
      bottom: 5,
      borderTop: '10px solid transparent',
      borderBottom: '10px solid transparent',
    },
    '.left &': {
      background: theme.palette.secondary.light,
      color: theme.palette.getContrastText(theme.palette.secondary.light),
    },
    '.right &': {
      background: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light),
    },
    '.left &::before': {
      left: -10,
      borderRight: `10px solid ${theme.palette.secondary.light}`,
    },
    '.right &::before': {
      right: -10,
      borderLeft: `10px solid ${theme.palette.primary.light}`,
    },
  },
});

class ChatList extends Component {
  render() {
    const { classes, user, chat } = this.props;
    const { picture } = user;
    return (
      <ol className={classes.list}>
        {chat.messageList.map((el, idx) => (
          <li
            key={idx}
            className={ClassNames(
              classes.item,
              el.type === 'bot' ? 'left' : 'right'
            )}
          >
            <Avatar
              className={el.type === 'bot' ? classes.botAvatar : null}
              src={el.type === 'user' ? picture || null : null}
            >
              {el.type === 'user' ? (
                picture ? null : (
                  <FaceIcon />
                )
              ) : (
                <FaceIcon />
              )}
            </Avatar>
            <Paper className={classes.chatItem}>
              <Typography color={'inherit'}>{el.message}</Typography>
            </Paper>
          </li>
        ))}
      </ol>
    );
  }
}

const mapStateToProps = state => ({
  chat: state.chat,
});

export default withStyles(styles)(connect(mapStateToProps)(ChatList));
