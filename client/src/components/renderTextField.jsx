import React from 'react';
import TextField from '@material-ui/core/TextField';

const renderTextField = ({ input, meta: { touched, error }, ...rest }) => (
  <TextField
    {...input}
    {...rest}
    FormHelperTextProps={
      touched && error ? { error: true, component: error } : null
    }
  />
);

export default renderTextField;
