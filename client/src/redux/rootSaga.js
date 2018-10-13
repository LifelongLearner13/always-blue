import { all, call, takeLatest } from 'redux-saga/effects';
import { login, loginProc } from '../LogIn/sagas';
import theme from '../ThemePicker/sagas';
import { LOGIN_REQUESTING, LOGIN_PROCESSING } from './constants';

/**
 * Handle the async actions within the application.
 */
export default function* rootSaga() {
  // Tasks are run in parallel
  yield all([
    takeLatest(LOGIN_REQUESTING, login),
    takeLatest(LOGIN_PROCESSING, loginProc),
    call(theme),
  ]);
}
