import initialState from '../initialState';

export default (state = initialState.theme, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
    default:
      return state;
  }
};
