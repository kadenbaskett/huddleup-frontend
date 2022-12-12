import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { User } from '@interfaces/user.interface';
import { fetchPublicLeagues } from '@services/apiClient';

export interface userSliceState {
  user_info: User;
  leagues: League[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: userSliceState = {
  user_info: null,
  leagues: [],
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user: User = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
      };
      state.user_info = user;
    },
    setLeagues: (state, action) => {
      state.leagues = action.payload.leauges;
    },
    addLeague: (state, action) => {
      state.leagues.push(action.payload.league);
    },
    removeLeague: (state, action) => {
      const leagueID = action.payload;
      state.leagues.filter((league) => league.id !== leagueID);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserLeaguesThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUserLeaguesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.leagues = action.payload;
      })
      .addCase(fetchUserLeaguesThunk.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message;
      });
  },
});

export const fetchUserLeaguesThunk = createAsyncThunk('user/fetchUserLeagues', async () => {
  const response = await fetchPublicLeagues();
  return response.data ? response.data : [];
});

export const { setUser, setLeagues, addLeague, removeLeague } = userSlice.actions;

export default userSlice;
