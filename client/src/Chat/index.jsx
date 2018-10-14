import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import ChatList from './ChatList';
import TextFieldWrapper from '../common/TextFieldWrapper';
import { getUser } from '../redux/stateSelectors';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    margin: '0 auto',
    padding: theme.spacing.unit * 2,
  },
  typeArea: {
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    justifyContent: 'center',
    alignItem: 'center',
  },
  textInput: {
    flexGrow: 1,
  },
  submitButton: {
    alignSelf: 'flex-end',
  },
});

class Chat extends Component {
  submitCallback = formData => {
    const { dispatch } = this.props;
    dispatch({
      event: true,
      handle: 'newMsg',
      payload: formData,
    });
    formData.message = '';
  };
  
  render() {
    const { classes, user, handleSubmit } = this.props;
    return (
      <form
        onSubmit={handleSubmit(this.submitCallback)}
        className={classes.root}
      >
        <Paper className={classes.paper}>
          <ChatList user={user} />
          <Paper className={classes.typeArea}>
            <Grid container spacing={16}>
              <Grid container item xs={12}>
                <Field
                  className={classes.textInput}
                  variant="filled"
                  margin="normal"
                  label={'How can we help'}
                  multiline
                  name={'message'}
                  component={TextFieldWrapper}
                />
              </Grid>
              <Grid container spacing={16} item xs={12} justify={'flex-end'}>
                <Grid container spacing={16} item xs={3} justify={'flex-end'}>
                  <Button
                    className={classes.submitButton}
                    onClick={handleSubmit(this.submitCallback)}
                    variant="extendedFab"
                    color="primary"
                    aria-label="Add"
                  >
                    <AddIcon style={{ marginRight: '10px' }} />
                    <Typography color={'inherit'}>Add</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
      </form>
    );
  }
}

const Form = reduxForm({
  form: 'chat',
})(withStyles(styles)(Chat));

const mapStateToProps = state => ({
  user: getUser(state),
});

export default connect(mapStateToProps)(Form);
