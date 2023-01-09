import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { User } from '@interfaces/user.interface';
import { fetchUser, fetchUserLeagues } from '@services/apiClient';

export interface userSliceState {
  userInfo: User;
  leagues: League[];
  createUserStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: userSliceState = {
  userInfo: null,
  leagues: null,
  createUserStatus: 'idle',
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(handleUserInitThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(handleUserInitThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload.user;
        state.leagues = action.payload.leagues;
      })
      .addCase(handleUserInitThunk.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const handleUserInitThunk = createAsyncThunk('user/initUser', async (email: string) => {
  const userResp = await fetchUser(email);
  const leaguesResp = userResp.data ? await fetchUserLeagues(userResp.data.id) : null;

  return {
    user: userResp.data ? userResp.data : null,
    leagues: leaguesResp.data ? leaguesResp.data : null,
  };
});

export default userSlice;
export const { logoutUser } = userSlice.actions;
