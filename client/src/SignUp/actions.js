import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from '../redux/constants';

export const signupRequest = ({ email, password }) => ({
  type: SIGNUP_REQUESTING,
  email,
  password
});

export const signupSuccess = response => ({
  type: SIGNUP_SUCCESS,
  ...response
});

export const signupError = response => ({ type: SIGNUP_ERROR, ...response });
