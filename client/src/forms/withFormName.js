import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

export default (formName, WrappedComponent) => {
  class Form extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return reduxForm({
    form: formName
  })(Form);
};
