import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ChatList from './ChatList';
import TextFieldWrapper from '../common/TextFieldWrapper';

const styles = theme => ({});

class Chat extends Component {
  submitCallback = formData => {
    console.log('form submitted: ', formData);
  };
  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitCallback)}>
        <ChatList />
        <Field
          label={'How can we help'}
          multiline
          name={'message'}
          component={TextFieldWrapper}
        />
      </form>
    );
  }
}

const Form = reduxForm({
  form: 'chat',
})(withStyles(styles)(Chat));

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Form);
