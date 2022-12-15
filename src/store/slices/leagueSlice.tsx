import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeagueInfo, fetchLeaguePlayers } from '@services/apiClient';

export interface leagueSliceState {
  league: any;
  playerList: any[];
  playerFetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  leagueFetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: leagueSliceState = {
  league: null,
  playerList: [],
  playerFetchStatus: 'idle',
  leagueFetchStatus: 'idle',
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLeaguePlayersThunk.pending, (state, action) => {
        state.playerFetchStatus = 'loading';
      })
      .addCase(fetchLeaguePlayersThunk.fulfilled, (state, action) => {
        state.playerFetchStatus = 'succeeded';
        state.playerList = action.payload;
      })
      .addCase(fetchLeaguePlayersThunk.rejected, (state, action) => {
        state.playerFetchStatus = 'failed';
      })
      .addCase(fetchLeagueInfoThunk.pending, (state, action) => {
        state.leagueFetchStatus = 'loading';
      })
      .addCase(fetchLeagueInfoThunk.fulfilled, (state, action) => {
        state.leagueFetchStatus = 'succeeded';
        state.league = action.payload;
      })
      .addCase(fetchLeagueInfoThunk.rejected, (state, action) => {
        state.leagueFetchStatus = 'failed';
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
