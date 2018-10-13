import { SENT_CHAT_MSG, GOT_CHAT_MSG } from '../redux/constants';
import initialState from '../redux/initialState';

export default (state = initialState.chat, action) => {
  switch (action.type) {
    case SENT_CHAT_MSG:
      return {
        ...state,
        userMsg: action.payload
      };
    case GOT_CHAT_MSG: 
      return {
        ...state,
        botMsg: action.payload
      };
    default:
      return state;
  }
};