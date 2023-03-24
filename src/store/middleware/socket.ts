import { Middleware } from 'redux';
import { draftActions } from '@store/slices/draftSlice';
import SockJS from 'sockjs-client';

const draftMiddleware: Middleware = (store) => {
  // const url = 'http://localhost:9999/echo';
  const url = 'http://c367-155-98-131-7.ngrok.io/echo';
  let socket;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().draft.isConnected;

    if (draftActions.killConnection.match(action)) {
      // console.log('Socket in kill connection: ', socket);
      socket.close();
    } else if (draftActions.startConnecting.match(action)) {
      // console.log('Socket: ', socket);

      socket = new SockJS(url);

      socket.onopen = function () {
        store.dispatch(draftActions.connectionEstablished());
      };

      socket.onmessage = function (socketMessage) {
        store.dispatch(draftActions.receiveMessage({ socketMessage }));
      };

      socket.onclose = function () {
        if (!store.getState().draft.isKilled) {
          store.dispatch(draftActions.connectionClosed());
          store.dispatch(draftActions.startConnecting());
        } else {
          store.dispatch(draftActions.leaveDraft());
        }
      };
    }

    if (draftActions.sendMessage.match(action) && isConnectionEstablished) {
      socket?.send(action.payload.content);
    }

    next(action);
  };
};

export default draftMiddleware;
