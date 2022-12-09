import { createSlice } from '@reduxjs/toolkit';

export interface usersSliceState {
  user_list: any[];
}

const initialState: usersSliceState = {
  user_list: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user_list = [...state.user_list, action.payload];
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice;
