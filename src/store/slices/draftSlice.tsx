import { DraftPlayer, QueuePlayer, DraftOrder, AutoDraft } from '@interfaces/draft.interface';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MSG_TYPES } from '@store/middleware/socket';
import { fetchDraftPort } from '@services/apiClient';

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
  draftPort: string;
  currentPickTimeMS: number;
  draftStartTimeMS: number;
  secondsPerPick: number;
  autoSecondsPerPick: number;
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
  draftPort: '',
  currentPickTimeMS: 0,
  draftStartTimeMS: 0,
  secondsPerPick: 0,
  autoSecondsPerPick: 0,
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
          state.draftPlayers = content.draftPlayers;
          state.draftQueue = content.draftQueue;
          state.draftOrder = content.draftOrder;
          state.autoDraft = content.autoDraft;
          state.currentPickNum = content.currentPickNum;
          state.currentPickTeamId = content.currentPickTeamId;
          state.currentRoundNum = content.currentRoundNum;
          state.hasInitialDraftState = true;
          state.currentPickTimeMS = Number(content.currentPickTimeMS);
          state.draftStartTimeMS = Number(content.draftStartTimeMS);
          state.secondsPerPick = Number(content.secondsPerPick);
          state.autoSecondsPerPick = Number(content.autoSecondsPerPick);
          break;
        case MSG_TYPES.END_DRAFT:
          console.log('ending draft');
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
  extraReducers(builder) {
    builder
      .addCase(handleFetchDraftPort.rejected, (state, action) => {
        console.log('Request for draft port number rejected');
      })
      .addCase(handleFetchDraftPort.fulfilled, (state, action) => {
        state.draftPort = action.payload.port;
      });
  },
});

export const handleFetchDraftPort = createAsyncThunk(
  'draft/initDraft',
  async (leagueId: number) => {
    const resp = await fetchDraftPort(leagueId);
    return {
      port: resp.data,
    };
  },
);

export const draftActions = draftSlice.actions;
export default draftSlice;
