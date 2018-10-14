import io from 'socket.io-client';
import { SENT_CHAT_MSG, GOT_CHAT_MSG } from '../redux/constants';
import { store } from '../index';

export default function socketMiddleware() {
  const socket = io.connect(window.origin + ':4000');

  socket.on('bot msg', botData => {
    console.log(botData);
    if (botData) {
      store.dispatch({type: GOT_CHAT_MSG, payload: {msg: botData[0]}});
      if (botData.length > 1) {
        store.dispatch({type: GOT_CHAT_MSG, payload: {msg: botData[1]}});
      }
    }
  });

  return ({ dispatch }) => next => action => {
    if (typeof action === 'function') {
      return next(action);
    }

    const { event, leave, handle } = action;

    if (!event) {
      return next(action);
    }

    if (leave) {
      socket.removeListener(event);
    }

    let handleEvent = handle;
    if (typeof handleEvent === 'string') {
      if (handleEvent === 'newMsg') {
        socket.emit('new message', action.payload);
        dispatch({ type: SENT_CHAT_MSG, payload: action.payload });
      }
    }
    return socket.on(event, handleEvent);
  };
}
