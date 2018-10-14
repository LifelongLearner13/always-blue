import { SENT_CHAT_MSG, GOT_CHAT_MSG } from '../redux/constants';
import initialState from '../redux/initialState';

export default (state = initialState.chat, action) => {
  switch (action.type) {
    case SENT_CHAT_MSG:
      console.log(state);
      console.log(action.payload);
      return {
        ...state,
        messageList: [...state.messageList, {message: action.payload.message, type: 'user'}]
      };
    case GOT_CHAT_MSG: 
      return {
        ...state,
        messageList: [...state.messageList, {message: action.payload, type: 'bot'}]
      };
    default:
      return state;
  }
};