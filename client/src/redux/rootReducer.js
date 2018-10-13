import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import profile from '../Profile/reducers';
import login from '../Auth/reducers';
import messages from '../MessageList/reducers';
import theme from '../ThemePicker/reducers';

/**
 * Map pieces of state to their corresponding reducers.
 */
export default combineReducers({
  profile,
  login,
  messages,
  theme,
  form,
});
