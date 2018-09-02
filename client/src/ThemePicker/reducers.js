import initialState from '../redux/initialState';

/**
 * Manages the `theme` piece of the Redux store
 */
export default (state = initialState.theme, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
    default:
      return state;
  }
};
