import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeagueInfo, fetchLeaguePlayers } from '@services/apiClient';

export interface leagueSliceState {
  league: any;
  settings: any;
  standings: any;
  matchups: any;
  teams: any[];
  rosters: any[];
  player_list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  leagueStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: leagueSliceState = {
  league: null,
  settings: null,
  standings: null,
  matchups: null,
  teams: [],
  rosters: [],
  player_list: [],
  status: 'idle',
  leagueStatus: 'idle',
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLeaguePlayersThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaguePlayersThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.player_list = action.payload;
      })
      .addCase(fetchLeaguePlayersThunk.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchLeagueInfoThunk.pending, (state, action) => {
        state.leagueStatus = 'loading';
      })
      .addCase(fetchLeagueInfoThunk.fulfilled, (state, action) => {
        state.leagueStatus = 'succeeded';
        state.league = action.payload;
        state.teams = action.payload.teams;
      })
      .addCase(fetchLeagueInfoThunk.rejected, (state, action) => {
        state.leagueStatus = 'failed';
      });
  },
});

export const fetchLeaguePlayersThunk = createAsyncThunk(
  'league/fetchLeaguePlayers',
  async (leagueId: number) => {
    const players = await fetchLeaguePlayers(leagueId);
    return players.data ? players.data : [];
  },
);

export const fetchLeagueInfoThunk = createAsyncThunk(
  'league/fetchLeagueInfo',
  async (leagueId: number) => {
    const league = await fetchLeagueInfo(leagueId);
    return league.data ? league.data : [];
  },
);

export default leagueSlice;
