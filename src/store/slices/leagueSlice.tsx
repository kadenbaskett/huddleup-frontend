import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeagueInfo, fetchLeaguePlayers } from '@services/apiClient';

export interface leagueSliceState {
  league: any;
  playerList: any[];
  userTeam: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: leagueSliceState = {
  league: null,
  playerList: null,
  userTeam: null,
  status: 'idle',
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleLeagueInitThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(handleLeagueInitThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.playerList = action.payload.players;
        state.league = action.payload.league;
        state.userTeam = action.payload.userTeam;
      })
      .addCase(handleLeagueInitThunk.rejected, (state, action) => {
        state.status = 'failed';
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
      userTeam: team,
    };
  },
);

export default leagueSlice;
