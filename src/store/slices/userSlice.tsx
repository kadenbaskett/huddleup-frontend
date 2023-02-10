import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League, Team } from '@interfaces/league.interface';
import { User } from '@interfaces/user.interface';
import { fetchUser, fetchUserLeagues, fetchUserTeams } from '@services/apiClient';
import { SLICE_STATUS } from '@store/slices/common';

export interface userSliceState {
  userInfo: User;
  leagues: League[];
  teams: Team[];
  createUserStatus: SLICE_STATUS;
  status: SLICE_STATUS;
  pollStatus: SLICE_STATUS;
  firebaseStatus: SLICE_STATUS;
}

const initialState: userSliceState = {
  userInfo: null,
  leagues: null,
  teams: null,
  createUserStatus: SLICE_STATUS.IDLE,
  status: SLICE_STATUS.IDLE,
  pollStatus: SLICE_STATUS.IDLE,
  firebaseStatus: SLICE_STATUS.IDLE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, actio) => {
      return {
        ...initialState,
        firebaseStatus: SLICE_STATUS.SUCCEEDED,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleUserInitThunk.pending, (state, action) => {
        state.status = SLICE_STATUS.LOADING;
      })
      .addCase(handleUserInitThunk.fulfilled, (state, action) => {
        state.status = SLICE_STATUS.SUCCEEDED;
        state.firebaseStatus = SLICE_STATUS.SUCCEEDED;
        state.userInfo = action.payload.user;
        state.leagues = action.payload.leagues;
        state.teams = action.payload.teams;
      })
      .addCase(userPollThunk.fulfilled, (state, action) => {
        state.pollStatus = SLICE_STATUS.POLLING;
        state.userInfo = action.payload.user;
        state.leagues = action.payload.leagues;
        state.teams = action.payload.teams;
      })
      .addCase(handleUserInitThunk.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
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
