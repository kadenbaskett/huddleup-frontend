import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { fetchPublicLeagues, fetchTimeframe } from '@services/apiClient';

export interface globalSliceState {
  publicLeagues: League[];
  totalWeeks: number;
  week: number;
  season: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  timeframeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: globalSliceState = {
  publicLeagues: [],
  week: null,
  totalWeeks: 18,
  season: null,
  status: 'idle',
  timeframeStatus: 'idle',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPublicLeaguesThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPublicLeaguesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.publicLeagues = action.payload;
      })
      .addCase(fetchPublicLeaguesThunk.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(fetchTimeframesThunk.pending, (state, action) => {
        state.timeframeStatus = 'loading';
      })
      .addCase(fetchTimeframesThunk.fulfilled, (state, action) => {
        state.timeframeStatus = 'succeeded';
        state.week = action.payload.current_week;
        state.season = action.payload.current_season;
      })
      .addCase(fetchTimeframesThunk.rejected, (state, action) => {
        state.timeframeStatus = 'failed';
      });
  },
});

export const handleAppInitThunk = createAsyncThunk('global/fetchPublicLeagues', async () => {
  const response = await fetchPublicLeagues();
  return response.data ? response.data : [];
});

export const fetchPublicLeaguesThunk = createAsyncThunk('global/fetchPublicLeagues', async () => {
  const response = await fetchPublicLeagues();
  return response.data ? response.data : [];
});

export const fetchTimeframesThunk = createAsyncThunk('global/fetchTimeframes', async () => {
  const response = await fetchTimeframe();
  return response.data ? response.data : [];
});

export default globalSlice;
