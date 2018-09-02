import { take, fork, cancel, call, put } from 'redux-saga/effects';
import {
  LOGIN_REQUESTING,
  LOGIN_ERROR,
  LOGOUT_REQUESTING
} from '../redux/constants';
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
} from '../utils/localStorage';
import {
  loginSuccess,
  loginError,
  logoutRequesting,
  logoutSuccess
} from './actions';

const LOGIN_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? `${window.location}/api/auth/login`
    : `${process.env.REACT_APP_DEV_API_URL}/auth/login`;

function loginApi(email, password) {
  return fetch(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(json => {
      // Check if server returned an error
      if (!json.success) {
        const serverError = new Error(json.message);
        throw serverError;
      }

      return json;
    })
    .catch(error => {
      if (process.env.NODE_ENV === 'production') {
        const userError = new Error('Something went wrong, please try again.');
        throw userError;
      } else {
        console.warn(error);
        throw error;
      }
    });
}

function* logout() {
  // dispatches the LOGOUT_REQUESTING action
  yield put(logoutRequesting());

  yield call(removeLocalStorage, 'token');
  yield call(removeLocalStorage, 'user');
  yield put(logoutSuccess());
}

function* loginFlow(email, password) {
  let response;
  try {
    let storedToken = getLocalStorage('token');
    let storedUser = getLocalStorage('user');

    if (storedToken) {
      yield put(
        loginSuccess({
          success: true,
          token: storedToken,
          user: storedUser,
          message: 'Login Successful'
        })
      );
    } else {
      if (!email || !password) return false;
      response = yield call(loginApi, email, password);
      yield call(setLocalStorage, 'user', response.user);
      yield call(setLocalStorage, 'token', response.token);
      yield put(loginSuccess(response));
    }
  } catch (error) {
    console.error('loginFlow error: ', error);
    yield put(loginError({ success: false, message: error.message }));
    return false;
  }

  return true;
}

function* loginWatcher() {
  let loginTask = null;
  let action = null;
  while (true) {
    action = yield take([LOGOUT_REQUESTING, LOGIN_REQUESTING]);

    if (action.type === LOGIN_REQUESTING) {
      const { email, password } = action;

      // Non-blocking execution continues until next yield
      loginTask = yield fork(loginFlow, email, password);
      action = yield take([LOGOUT_REQUESTING, LOGIN_ERROR]);

      if (action.type === LOGOUT_REQUESTING) {
        yield cancel(loginTask);
        yield call(logout);
      }
    } else {
      yield call(logout);
    }
  }
}

export { loginFlow };
export default loginWatcher;
