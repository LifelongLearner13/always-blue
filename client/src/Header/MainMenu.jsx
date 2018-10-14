import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/FaceOutlined';
import CommentIcon from '@material-ui/icons/CommentOutlined';
import MapIcon from '@material-ui/icons/MapOutlined';

const styles = theme => ({
  list: {
    width: 250,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.black,
  },
});

const MainMenu = ({
  classes,
  isOpen,
  handleClose,
  isAuthenticated,
  history,
}) => {
  const content = (
    <div className={classes.list}>
      {isAuthenticated && (
        <List component={'nav'}>
          <ListItem button={true} onClick={() => history.push('/profile')}>
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText>
              <Link className={classes.link} to={'/profile'}>
                Profile
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem button={true} onClick={() => history.push('/chat')}>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText>
              <Link className={classes.link} to={'/chat'}>
                Chat
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem button={true} onClick={() => history.push('/map')}>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText>
              <Link className={classes.link} to={'/map'}>
                Map
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      )}
    </div>
  );
  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <div
        tabIndex={0}
        role={'button'}
        onClick={handleClose}
        onKeyDown={handleClose}
      >
        {content}
      </div>
    </Drawer>
  );
};

MainMenu.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  isAuthenticated: PropTypes.string,
  classes: PropTypes.object,
  history: PropTypes.any,
};

export default withRouter(withStyles(styles)(MainMenu));
