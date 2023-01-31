import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League, Team } from '@interfaces/league.interface';
import { User } from '@interfaces/user.interface';
import { fetchUser, fetchUserLeagues, fetchUserTeams } from '@services/apiClient';

export interface userSliceState {
  userInfo: User;
  leagues: League[];
  teams: Team[];
  createUserStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  pollStatus: 'idle' | 'polling';
  firebaseStatus: 'idle' | 'succeeded';
}

const initialState: userSliceState = {
  userInfo: null,
  leagues: null,
  teams: null,
  createUserStatus: 'idle',
  status: 'idle',
  pollStatus: 'idle',
  firebaseStatus: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, actio) => {
      return {
        ...initialState,
        firebaseStatus: 'succeeded',
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleUserInitThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(handleUserInitThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.firebaseStatus = 'succeeded';
        state.userInfo = action.payload.user;
        state.leagues = action.payload.leagues;
        state.teams = action.payload.teams;
      })
      .addCase(userPollThunk.fulfilled, (state, action) => {
        state.pollStatus = 'polling';
        state.userInfo = action.payload.user;
        state.leagues = action.payload.leagues;
        state.teams = action.payload.teams;
      })
      .addCase(handleUserInitThunk.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const handleUserInitThunk = createAsyncThunk('user/initUser', async (email: string) => {
  const userResp = await fetchUser(email);
  const leaguesResp = userResp.data ? await fetchUserLeagues(userResp.data.id) : null;
  const teamsResp = userResp.data ? await fetchUserTeams(userResp.data.id) : null;
  return {
    user: userResp.data ? userResp.data : null,
    leagues: leaguesResp.data ? leaguesResp.data : null,
    teams: teamsResp.data ? teamsResp.data : null,
  };
});

export const userPollThunk = createAsyncThunk('user/poll', async (email: string) => {
  const userResp = await fetchUser(email);
  const leaguesResp = userResp.data ? await fetchUserLeagues(userResp.data.id) : null;
  const teamsResp = userResp.data ? await fetchUserTeams(userResp.data.id) : null;
  return {
    user: userResp.data ? userResp.data : null,
    leagues: leaguesResp.data ? leaguesResp.data : null,
    teams: teamsResp.data ? teamsResp.data : null,
  };
});

export default userSlice;
export const { logoutUser } = userSlice.actions;
