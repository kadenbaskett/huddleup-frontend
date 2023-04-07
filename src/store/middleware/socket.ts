/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { Middleware } from 'redux';
import SockJS from 'sockjs-client';
import { draftActions, draftSliceState } from '@store/slices/draftSlice';
import { userSliceState } from '@store/slices/userSlice';
import { leagueSliceState } from '@store/slices/leagueSlice';

const CONNECTION = {
  HOST: 'localhost',
  PORT: 9999,
  SERVER_PREFIX: '/websocket/draft',
  SCHEME: 'http',
};

const NGROK_CONNECTION = {
  HOST: 'c367-155-98-131-7.ngrok.io',
  PORT: '9999',
  SERVER_PREFIX: '/websocket/draft',
  SCHEME: 'http',
};

// NEEDS TO BY IN SYNC WITH THE BACKEND
export const MSG_TYPES = {
  PING: 'ping',
  INITIAL_CONNECTION: 'initialConnectionGetDraftState',
  DRAFT_UPDATE: 'draftUpdate',
  QUEUE_PLAYER: 'queuePlayer',
  DRAFT_PLAYER: 'draftPlayer',
  ERROR: 'error',
};

export function formatMessage(msgContent, type) {
  return {
    content: msgContent,
    type,
  };
}

const draftMiddleware: Middleware = (store) => {
  const local_url = `${CONNECTION.SCHEME}://${CONNECTION.HOST}:${CONNECTION.PORT}${CONNECTION.SERVER_PREFIX}`;
  const url = `${NGROK_CONNECTION.SCHEME}://${NGROK_CONNECTION.HOST}${NGROK_CONNECTION.SERVER_PREFIX}`;

  let socket;
  let initDraftStateInterval;

  // This is the only place socket.send should be called
  function sendSocketMessage(msg) {
    msg = packMessage(msg);
    socket?.send(JSON.stringify(msg));
  }

  function requestInitialDraftState() {
    initDraftStateInterval = setInterval(() => {
      console.log('Requesting initial draft state');
      const draftState: draftSliceState = store.getState().draft;
      const userState: userSliceState = store.getState().user;
      const leagueState: leagueSliceState = store.getState().league;

      if (
        !draftState.hasInitialDraftState &&
        userState.userInfo.id &&
        leagueState.league?.id &&
        leagueState.userTeam?.id
      ) {
        const initMsg = {
          type: MSG_TYPES.INITIAL_CONNECTION,
          content: {},
        };
        sendSocketMessage(initMsg);
      } else {
        clearInterval(initDraftStateInterval);
      }
    }, 1000);
  }

  // Responsible for adding fields to the message that we want to send every time, eg: if we want to send user_id, team_id, and league_id with every msg
  function packMessage(msg) {
    const userState: userSliceState = store.getState().user;
    const leagueState: leagueSliceState = store.getState().league;
    return {
      ...msg,
      content: {
        ...msg.content,
        user_id: userState.userInfo.id,
        league_id: leagueState.league.id,
        team_id: leagueState.userTeam.id,
      },
    };
  }

  return (next) => (action) => {
    if (!action.type.startsWith('draft')) {
      next(action);
    }

    const draftState: draftSliceState = store.getState().draft;
    const isConnectionEstablished = socket && draftState.isConnected;
    const isDraftKilled = draftState.isKilled;

    if (draftActions.killConnection.match(action)) {
      socket.close();
    } else if (draftActions.startConnecting.match(action)) {
      const url = `${CONNECTION.SCHEME}://${CONNECTION.HOST}:49154${CONNECTION.SERVER_PREFIX}`;
      socket = new SockJS(url);

      socket.onopen = function () {
        store.dispatch(draftActions.connectionEstablished());
        requestInitialDraftState();
      };

      socket.onmessage = function (socketMessage) {
        store.dispatch(draftActions.receiveMessage({ socketMessage }));
      };

      socket.onclose = function () {
        if (!isDraftKilled) {
          store.dispatch(draftActions.connectionClosed());
          store.dispatch(draftActions.startConnecting());
        } else {
          store.dispatch(draftActions.leaveDraft());
        }
      };
    }

    if (draftActions.sendMessage.match(action) && isConnectionEstablished) {
      sendSocketMessage(action.payload);
    }

    next(action);
  };
};

export default draftMiddleware;
