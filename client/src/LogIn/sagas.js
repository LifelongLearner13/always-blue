import { take, fork, cancel, call, put } from 'redux-saga/effects';
import Auth from '../utils/Auth';
import {
  LOGIN_REQUESTING,
  LOGIN_ERROR,
  LOGOUT_REQUESTING,
} from '../redux/constants';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../utils/localStorage';
import {
  loginSuccess,
  loginError,
  logoutRequesting,
  logoutSuccess,
} from './actions';
import { themeReset, themeSuccess } from '../ThemePicker/actions';

// API endpoint may change based on the build environment
const LOGIN_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/api/auth/login`
    : `${process.env.REACT_APP_DEV_API_URL}/auth/login`;

const auth = new Auth();
/**
 * Saga generator for logging the user out.
 */
function* logout() {
  // dispatches the LOGOUT_REQUESTING action
  yield put(logoutRequesting());

  // Remove information from local storage
  yield call(removeLocalStorage, 'token');
  yield call(removeLocalStorage, 'user');

  yield put(themeReset());

  // dispatch success action
  yield put(logoutSuccess());
}

/**
 * Saga generator that will attempt to log a user in
 * @param {*} email - User's email, if null will try to retrieve JWT from local storage
 * @param {*} password - User's password, if null will try to retrieve JWT from local storage
 */
function* loginFlow(email, password) {
  let response;
  try {
    // Look to see if data is stored in local storage
    let tokenAge = getLocalStorage('expires_at');

    if (tokenAge && auth.isValid(tokenAge)) {
      // If JWT was in local storage, dispatch action to log user in
      let token = getLocalStorage('access_token');
      yield put(
        loginSuccess({
          success: true,
          token: token,
          user: {},
          message: 'Login Successful',
        })
      );
    } else {
      // Redirect to Auth0
      yield call(auth.authorize);

      // Add information to local storage
      yield call(setLocalStorage, 'user', response.user);
      yield call(setLocalStorage, 'token', response.token);

      // Dispatch action to log user in
      yield put(loginSuccess(response));

      // Load preferences, if any are associated with user
      if (response.user.preferences) {
        yield put(
          themeSuccess({
            success: true,
            message: 'Saved theme loaded',
            preferences: response.user.preferences,
          })
        );
      }
    }
  } catch (error) {
    // API error, dispatch action to display message to user
    yield put(loginError({ success: false, message: error.message }));
    return false;
  }

  return true;
}

function* login() {
  console.log('login Called');
  yield call(auth.login);
}

function* loginProc() {
  const result = yield call(auth.handleAuthentication);
  console.log(result);
}

export { login, loginProc };
