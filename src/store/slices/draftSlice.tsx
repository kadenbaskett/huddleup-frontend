import { DraftPlayer, QueuePlayer } from '@interfaces/draft.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface draftSliceState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  lostConnection: boolean;
  isKilled: boolean;
  draftPlayers: DraftPlayer[];
  draftQueue: QueuePlayer[];
}

const initialState: draftSliceState = {
  isEstablishingConnection: false,
  isConnected: false,
  lostConnection: false,
  isKilled: false,
  draftPlayers: [],
  draftQueue: [],
};

export const draftSlice = createSlice({
  name: 'draft',
  initialState,
  reducers: {
    startConnecting: (state) => {
      console.log('Websocket: start connecting');
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      console.log('Websocket: connection establishd');
      state.isConnected = true;
      state.isEstablishingConnection = false;
      state.lostConnection = false;
    },
    connectionClosed: (state) => {
      console.log('Websocket: connection closed');
      state.isConnected = false;
      state.isEstablishingConnection = false;
      state.lostConnection = true;
    },
    killConnection: (state) => {
      console.log('Websocket: connection killed');
      state.isConnected = false;
      state.isEstablishingConnection = false;
      state.lostConnection = false;
      state.isKilled = true;
    },
    leaveDraft: (state) => {
      console.log('Websocket: leaving deaft');
      state.isKilled = false;
    },
    receiveMessage: (
      state,
      action: PayloadAction<{
        socketMessage;
      }>,
    ) => {
      // console.log('Websocket: recieved message');
      const message = JSON.parse(action.payload.socketMessage.data);
      console.log('Message', message);
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        content: string;
        type: string;
      }>,
    ) => {
      // console.log('Websocket: send message');
      console.log('Content: ', action.payload.content);
      console.log('Type: ', action.payload.type);
    },
  },
});

export const draftActions = draftSlice.actions;
export default draftSlice;
