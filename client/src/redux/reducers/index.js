import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user';
import theme from './theme';

export default combineReducers({
  user,
  theme,
  form
});
