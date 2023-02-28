import { Team } from '@interfaces/league.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeagueInfo, fetchLeaguePlayers } from '@services/apiClient';
import { SLICE_STATUS } from '@store/slices/common';

export interface leagueSliceState {
  league: any;
  playerList: any[];
  userTeam: Team;
  transactions: any[];
  status: SLICE_STATUS;
  pollStatus: SLICE_STATUS;
}

const initialState: leagueSliceState = {
  league: null,
  playerList: null,
  userTeam: null,
  transactions: null,
  status: SLICE_STATUS.IDLE,
  pollStatus: SLICE_STATUS.IDLE,
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setPollStatus.fulfilled, (state, action) => {
        state.pollStatus = SLICE_STATUS.NEEDS_UPDATE;
      })
      .addCase(handleLeagueInitThunk.pending, (state, action) => {
        state.status = SLICE_STATUS.LOADING;
      })
      .addCase(handleLeagueInitThunk.fulfilled, (state, action) => {
        state.status = SLICE_STATUS.SUCCEEDED;
        state.playerList = action.payload.players;
        state.league = action.payload.league;
        state.transactions = action.payload.transactions;
        state.userTeam = action.payload.userTeam;
      })
      .addCase(handleLeagueInitThunk.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
      })
      .addCase(pollForUpdates.fulfilled, (state, action) => {
        state.pollStatus = SLICE_STATUS.POLLING;
        state.playerList = action.payload.players;
        state.league = action.payload.league;
        state.userTeam = action.payload.userTeam;
      });
  },
});

export const handleLeagueInitThunk = createAsyncThunk(
  'league/initLeague',
  async (leagueId: number, { getState }) => {
    const playersResp = await fetchLeaguePlayers(leagueId);
    const leagueResp = await fetchLeagueInfo(leagueId);

    const userId = getState().user.userInfo.id;
    const team = userId
      ? leagueResp.data.teams.find((team) =>
          team.managers.find((manager) => manager.user_id === userId),
        )
      : null;

    return {
      players: playersResp.data ? playersResp.data : null,
      league: leagueResp.data ? leagueResp.data : null,
      transactions: null,
      userTeam: team,
    };
  },
);

export const pollForUpdates = createAsyncThunk(
  'league/pollUpdate',
  async (leagueId: number, { getState }) => {
    const playersResp = await fetchLeaguePlayers(leagueId);
    const leagueResp = await fetchLeagueInfo(leagueId);

    const userId = getState().user.userInfo.id;
    const team = userId
      ? leagueResp.data.teams.find((team) =>
          team.managers.find((manager) => manager.user_id === userId),
        )
      : null;

    return {
      players: playersResp.data ? playersResp.data : null,
      league: leagueResp.data ? leagueResp.data : null,
      userTeam: team,
    };
  },
);

export const setPollStatus = createAsyncThunk(
  'league/setPollStatus',
  async (pollStatus: SLICE_STATUS) => {
    return { pollStatus };
  },
);

export default leagueSlice;
