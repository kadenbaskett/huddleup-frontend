import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { User } from '@interfaces/user.interface';
// import { addUser, fetchUser, fetchUserLeagues } from '@services/apiClient';
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
    logoutUser: (state, action) => {
      state = initialState;
      console.log('User logged out thunk fulfilled: ', state.userInfo);
      // localStorage.removeItem('user');
    },
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

        console.log('User login thunk fulfilled!!!: ', state.userInfo);

        // // Set the user in local storage so that the info persists between logins
        // const user = {
        //   email: state.userInfo.email,
        //   username: state.userInfo.username,
        // };

        // localStorage.setItem('user', JSON.stringify(user));
      })
      .addCase(handleUserInitThunk.rejected, (state, action) => {
        state.status = 'failed';

        // On a failed login, clear the user from localStorage
        // localStorage.removeItem('user');
        // })
        // .addCase(createUserThunk.fulfilled, (state, action) => {
        //   state.createUserStatus = 'succeeded';
        //   state.userInfo = action.payload;

        //   // Set the user in local storage so that the info persists between logins
        //   // const user = {
        //   //   email: action.payload.email,
        //   //   username: action.payload.username,
        //   // };

        //   // localStorage.setItem('user', JSON.stringify(user));
        // })
        // .addCase(createUserThunk.rejected, (state, action) => {
        //   state.createUserStatus = 'failed';
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

// export const createUserThunk = createAsyncThunk(
//   'user/addUser',
//   async ({ username, email }: { username: string; email: string }) => {
//     const userResp = await addUser(username, email);
//     return userResp.data ? userResp.data : null;
//   },
// );

export default userSlice;
export const { logoutUser } = userSlice.actions;
