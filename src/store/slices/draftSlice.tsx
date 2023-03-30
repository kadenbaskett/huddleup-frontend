import { DraftPlayer, QueuePlayer, DraftOrder, AutoDraft } from '@interfaces/draft.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MSG_TYPES } from '@store/middleware/socket';

export interface draftSliceState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
  lostConnection: boolean;
  hasInitialDraftState: boolean;
  isKilled: boolean;
  draftPlayers: DraftPlayer[];
  draftQueue: QueuePlayer[];
  draftOrder: DraftOrder[];
  autoDraft: AutoDraft[];
  currentPickTeamId: number;
  currentPickNum: number;
  currentRoundNum: number;
}

const initialState: draftSliceState = {
  isEstablishingConnection: false,
  isConnected: false,
  lostConnection: false,
  hasInitialDraftState: false,
  isKilled: false,
  draftPlayers: [],
  draftQueue: [],
  draftOrder: [],
  autoDraft: [],
  currentPickNum: 1,
  currentPickTeamId: -1, // this shouldn't matter but who knows
  currentRoundNum: 1,
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
      console.log('Websocket: leaving draft');
      state.isKilled = false;
    },
    receiveMessage: (
      state,
      action: PayloadAction<{
        socketMessage;
      }>,
    ) => {
      const message = JSON.parse(action.payload.socketMessage.data);
      const type = message.type;
      const content = message.content;

      switch (type) {
        case MSG_TYPES.DRAFT_UPDATE:
          console.log(message);
          state.draftPlayers = content.draftPlayers;
          state.draftQueue = content.draftQueue;
          state.draftOrder = content.draftOrder;
          state.autoDraft = content.autoDraft;
          state.currentPickNum = content.currentPickNum;
          state.currentPickTeamId = content.currentPickTeamId;
          state.currentRoundNum = content.currentRoundNum;
          state.hasInitialDraftState = true;
          break;
        case MSG_TYPES.PING:
          break;
        default:
          console.log('Enexpected message type: ', type);
          console.log(content);
      }
    },
    sendMessage: (
      state,
      action: PayloadAction<{
        content: Object;
        type: string;
      }>,
    ) => {},
  },
});

export const draftActions = draftSlice.actions;
export default draftSlice;
