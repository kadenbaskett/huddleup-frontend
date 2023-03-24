import { Middleware } from 'redux';
import { draftActions } from '@store/slices/draftSlice';
import SockJS from 'sockjs-client';

const draftMiddleware: Middleware = (store) => {
  const url = 'http://localhost:9999/echo';
  let socket;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().draft.isConnected;

    if (draftActions.startConnecting.match(action)) {
      socket = new SockJS(url);

      socket.onopen = function () {
        store.dispatch(draftActions.connectionEstablished());
      };

      socket.onmessage = function (socketMessage) {
        store.dispatch(draftActions.receiveMessage({ socketMessage }));
      };

      socket.onclose = function () {
        store.dispatch(draftActions.connectionClosed());
        store.dispatch(draftActions.startConnecting());
      };
    }

    if (draftActions.sendMessage.match(action) && isConnectionEstablished) {
      socket?.send(action.payload.content);
    }

    next(action);
  };
};

export default draftMiddleware;
