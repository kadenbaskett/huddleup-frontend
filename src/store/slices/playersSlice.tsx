import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPlayers } from '@services/apiClient';

export interface playersSliceState {
  player_list: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: playersSliceState = {
  player_list: [],
  status: 'idle',
};

export const playersSlice = createSlice({
  name: 'players',

  initialState,

  reducers: {
    setPlayers(state, action) {
      state.player_list = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlayersThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPlayersThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.player_list = action.payload;
      })
      .addCase(fetchPlayersThunk.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
      });
  },
});

export const fetchPlayersThunk = createAsyncThunk('players/fetchPlayers', async () => {
  const response = await fetchPlayers();
  return response.data ? response.data : [];
});

export const { setPlayers } = playersSlice.actions;
export default playersSlice;
