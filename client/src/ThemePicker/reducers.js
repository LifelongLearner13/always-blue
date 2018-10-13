import initialState from '../redux/initialState';
import {
  THEME_REQUESTING,
  THEME_SUCCESS,
  THEME_ERROR,
  THEME_RESET,
  LOGOUT_SUCCESS,
} from '../redux/constants';

/**
 * Manages the `theme` piece of the Redux store
 */
export default (state = initialState.theme, action) => {
  const { success, theme } = action;
  switch (action.type) {
    case THEME_REQUESTING:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case THEME_SUCCESS:
      return {
        ...state,
        requesting: false,
        success,
        primary: theme.primary,
        secondary: theme.secondary,
      };
    case THEME_ERROR:
      return {
        ...state,
        requesting: false,
        success,
      };
    case LOGOUT_SUCCESS: // Logging out automatically resets the theme
    case THEME_RESET:
      return {
        ...state,
        requesting: false,
        success: true,
        ...initialState.theme,
      };
    default:
      return state;
  }
};
