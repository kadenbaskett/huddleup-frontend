import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeaguePlayers } from '@services/apiClient';

export interface leagueSliceState {
  league: any;
  settings: any;
  standings: any;
  matchups: any;
  teams: any[];
  rosters: any[];
  player_list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
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
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLeagueInfoThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLeagueInfoThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.player_list = action.payload;
      })
      .addCase(fetchLeagueInfoThunk.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
      });
  },
});

export const fetchLeagueInfoThunk = createAsyncThunk(
  'league/fetchPlayers',
  async (leagueId: number) => {
    const response = await fetchLeaguePlayers(leagueId);
    return response.data ? response.data : [];
  },
);

export default leagueSlice;
