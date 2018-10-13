import { all, call } from 'redux-saga/effects';
import auth from '../LogIn/sagas';
import theme from '../ThemePicker/sagas';

/**
 * Handle the async actions within the application.
 */
export default function* rootSaga() {
  // Tasks are run in parallel
  yield all([call(auth), call(theme)]);
}
