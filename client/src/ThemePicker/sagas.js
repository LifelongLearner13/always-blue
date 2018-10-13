import { call, put, takeLatest } from 'redux-saga/effects';
import { THEME_REQUESTING } from '../redux/constants';
import { setLocalStorage, getLocalStorage } from '../utils/localStorage';
import { themeSuccess, themeError } from './actions';

function* themeFlow({ primary, secondary }) {
  try {
    // Make sure user is authenticated.
    let userProfile = yield call(getLocalStorage, 'user_profile');
    if (!userProfile) {
      let error = new Error('You must be logged in in order to save a theme.');
      throw error;
    }
    let preferences = yield call(getLocalStorage, 'preferences');
    preferences = preferences
      ? { ...preferences, ...{ theme: { primary, secondary } } }
      : { preferences: { theme: { primary, secondary } } };
    yield call(setLocalStorage, 'preferences', preferences);
    yield put(themeSuccess(preferences));
  } catch (error) {
    // If request failed, dispatch action to the store.
    yield put(themeError({ success: false, message: error.message }));
  }
}

// Watch for the THEME_REQUESTING action
function* themeWatcher() {
  // Take the latest action of type THEME_REQUESTING and run themeFlow.
  // If another THEME_REQUESTING action is dispatched before themeFlow
  // finishes execution, then takeLatest cancels the original function and
  // starts over.
  yield takeLatest(THEME_REQUESTING, themeFlow);
}

export default themeWatcher;
