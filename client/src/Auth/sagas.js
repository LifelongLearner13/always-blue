import { all, takeLatest, call, put } from 'redux-saga/effects';
import Auth from './Auth0';
import {
  LOGIN_PROCESSING,
  LOGIN_REQUESTING,
  LOGOUT_REQUESTING,
} from '../redux/constants';
import { getLocalStorage } from '../utils/localStorage';
import { loginSuccess, loginError, logoutSuccess } from './actions';
import { themeSuccess } from '../ThemePicker/actions';

// URL Auth0 will redirect to when done
const REDIRECT_URI = `${window.location.origin}/auth`;

const auth = new Auth(REDIRECT_URI);

function* logout() {
  yield call(auth.logout);
  yield put(
    logoutSuccess({
      success: true,
      message: 'Logout Success',
    })
  );
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

  const preferences = yield call(getLocalStorage, 'preferences');
  if (preferences && preferences.theme) {
    yield put(
      themeSuccess({
        success: true,
        message: 'Saved theme loaded',
        theme: preferences.theme,
      })
    );
  }
}

// Path represents the URL a user was trying to access
function* loginRequest({ path }) {
  const isValid = yield call(auth.isValid);
  const accessToken = yield call(auth.getAccessToken);
  if (isValid && accessToken) {
    yield call(login, accessToken);
  } else {
    yield call(auth.login, path);
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

function* authWatcher() {
  // Check to see if user is already logged in
  const isValid = yield call(auth.isValid);
  const accessToken = yield call(auth.getAccessToken);
  if (isValid && accessToken) {
    yield call(login, accessToken);
  }

  // Execute in parallel
  yield all([
    takeLatest(LOGIN_REQUESTING, loginRequest),
    takeLatest(LOGIN_PROCESSING, loginProc),
    takeLatest(LOGOUT_REQUESTING, logout),
  ]);
}

export default authWatcher;
