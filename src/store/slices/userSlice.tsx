import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League, Team } from '@interfaces/league.interface';
import { User } from '@interfaces/user.interface';
import { fetchUser, fetchUserLeagues, fetchUserTeams } from '@services/apiClient';
import { SLICE_STATUS } from '@store/slices/common';
import { logout, auth } from '../../firebase/firebase';

export interface userSliceState {
  userInfo: User;
  leagues: League[];
  teams: Team[];
  status: SLICE_STATUS;
  firebaseStatus: SLICE_STATUS;
}

const initialState: userSliceState = {
  userInfo: null,
  leagues: null,
  teams: null,
  status: SLICE_STATUS.IDLE,
  firebaseStatus: SLICE_STATUS.IDLE,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      return {
        ...initialState,
        firebaseStatus: SLICE_STATUS.SUCCEEDED,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleUserInitThunk.rejected, (state, action) => {
        // Logout the user if the init user failed (which means the user is not in our DB)
        state = {
          ...initialState,
        };

        void logout();
      })
      .addCase(handleUserInitThunk.fulfilled, (state, action) => {
        if (auth.currentUser) {
          state.status = SLICE_STATUS.SUCCEEDED;
          state.firebaseStatus = SLICE_STATUS.SUCCEEDED;
          state.userInfo = action.payload.user;
          state.leagues = action.payload.leagues;
          state.teams = action.payload.teams;
        } else {
          state = { ...initialState };
        }
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

export default userSlice;
export const { logoutUser } = userSlice.actions;
