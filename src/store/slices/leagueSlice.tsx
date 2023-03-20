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
}

const initialState: leagueSliceState = {
  league: null,
  playerList: null,
  userTeam: null,
  transactions: null,
  status: SLICE_STATUS.IDLE,
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleLeagueInitThunk.fulfilled, (state, action) => {
        state.status = SLICE_STATUS.SUCCEEDED;
        state.playerList = action.payload.players;
        state.league = action.payload.league;
        state.userTeam = action.payload.userTeam;
      })
      .addCase(handleLeagueInitThunk.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
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

    console.log('League update');

    return {
      players: playersResp.data ? playersResp.data : null,
      league: leagueResp.data ? leagueResp.data : null,
      userTeam: team,
    };
  },
);

export default leagueSlice;
