import {
  SIGNUP_REQUESTING,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR
} from '../redux/constants';
import initialState from '../redux/initialState';

export default (state = initialState.signup, action) => {
  const { success } = action;
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return {
        requesting: true,
        success
      };

    case SIGNUP_SUCCESS:
      return {
        requesting: false,
        success
      };

    case SIGNUP_ERROR:
      return {
        requesting: false,
        success
      };

    default:
      return state;
  }
};
