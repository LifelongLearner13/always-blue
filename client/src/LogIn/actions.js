import {
  LOGIN_REQUESTING,
  LOGIN_PROCESSING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
  LOGOUT_SUCCESS,
} from '../redux/constants';

/**
 * Redux action creators for the `login` piece of the store
 */

export const loginRequesting = () => ({ type: LOGIN_REQUESTING });

export const loginProcessing = () => ({ type: LOGIN_PROCESSING });

export const loginSuccess = response => ({ type: LOGIN_SUCCESS, ...response });

export const loginError = response => ({ type: LOGIN_ERROR, ...response });

export const logoutRequesting = response => ({
  type: LOGOUT_REQUESTING,
  ...response,
});

export const logoutSuccess = response => ({
  type: LOGOUT_SUCCESS,
  ...response,
});
