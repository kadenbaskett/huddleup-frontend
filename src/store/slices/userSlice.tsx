import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { User } from '@interfaces/user.interface';
import { addUser, fetchUser, fetchUserLeagues } from '@services/apiClient';

export interface userSliceState {
  userInfo: User;
  leagues: League[];
  leagueStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  userStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: userSliceState = {
  userInfo: null,
  leagues: [],
  leagueStatus: 'idle',
  userStatus: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserLeaguesThunk.pending, (state, action) => {
        state.leagueStatus = 'loading';
      })
      .addCase(fetchUserLeaguesThunk.fulfilled, (state, action) => {
        state.leagueStatus = 'succeeded';
        state.leagues = action.payload;
      })
      .addCase(fetchUserLeaguesThunk.rejected, (state, action) => {
        state.leagueStatus = 'failed';
      })
      .addCase(addUserThunk.pending, (state, action) => {
        state.userStatus = 'loading';
      })
      .addCase(addUserThunk.fulfilled, (state, action) => {
        state.userStatus = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(addUserThunk.rejected, (state, action) => {
        state.userStatus = 'failed';
      })
      .addCase(fetchUserThunk.pending, (state, action) => {
        state.userStatus = 'loading';
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.userStatus = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.userStatus = 'failed';
      });
  },
});

export const addUserThunk = createAsyncThunk(
  'user/addUser',
  async ({ username, email }: { username: string; email: string }) => {
    const response = await addUser(username, email);
    return response.data ? response.data : [];
  },
);

export const fetchUserThunk = createAsyncThunk('user/fetchUser', async (email: string) => {
  const response = await fetchUser(email);
  return response.data ? response.data : [];
});

export const fetchUserLeaguesThunk = createAsyncThunk(
  'user/fetchUserLeagues',
  async (userId: number) => {
    const response = await fetchUserLeagues(userId);
    return response.data ? response.data : [];
  },
);

export default userSlice;
