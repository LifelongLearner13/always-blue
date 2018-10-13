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

// URL Auth0 will redirect to when done
const REDIRECT_URI = `${window.location.origin}/auth`;

const auth = new Auth(REDIRECT_URI);

/**
 * Saga generator for logging the user out.
 */
function* logout() {
  yield call(auth.logout);
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
      }
    }
  } catch (error) {
    // API error, dispatch action to display message to user
    yield put(loginError({ success: false, message: error.message }));
    return false;
  }

  return true;
}

function* login(accessToken) {
  const userProfile = yield call(auth.getUserProfile);
  yield put(
    loginSuccess({
      success: true,
      token: accessToken,
      user: userProfile,
      message: 'Login Successful',
    })
  );

  const preferences = yield call(getLocalStorage, 'user_preferences');
  if (preferences) {
    yield put(
      themeSuccess({
        success: true,
        message: 'Saved theme loaded',
        preferences,
      })
    );
  }
}

function* loginRequest() {
  const isValid = yield call(auth.isValid);
  const accessToken = yield call(auth.getAccessToken);
  if (isValid && accessToken) {
    yield call(login, accessToken);
  } else {
    yield call(auth.login);
  }
}

function* loginProc() {
  try {
    const result = yield call(auth.handleAuthentication);
    yield call(login, result.accessToken);
  } catch (error) {
    console.error(error);
    yield put(
      loginError({
        success: false,
        message: 'Something went wrong, please try again.',
      })
    );
  }
}

export { loginRequest, loginProc };
