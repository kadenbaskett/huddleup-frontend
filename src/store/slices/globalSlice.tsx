import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { fetchPublicLeagues } from '@services/apiClient';

export interface globalSliceState {
  publicLeagues: League[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: globalSliceState = {
  publicLeagues: [],
  status: 'idle',
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
      });
  },
});

export const fetchPublicLeaguesThunk = createAsyncThunk('global/fetchPublicLeagues', async () => {
  const response = await fetchPublicLeagues();
  return response.data ? response.data : [];
});

export default globalSlice;
