import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// Import and combine all slices
import playersSlice, { playersSliceState } from '@store/slices/playersSlice';
import usersSlice, { usersSliceState } from '@store/slices/usersSlice';

export interface StoreState {
  players: playersSliceState;
  users: usersSliceState;
}

const combinedReducer = combineReducers({
  [playersSlice.name]: playersSlice.reducer,
  [usersSlice.name]: usersSlice.reducer,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState: StoreState = {
      ...state, // use previous state

      // Update each slice
      players: {
        status: state.players.status,
        player_list: [...action.payload.players.player_list, ...state.players.player_list],
      },
      users: {
        user_list: [...action.payload.users.user_list, ...state.users.user_list],
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () => configureStore({ reducer: masterReducer });
export const wrapper = createWrapper(makeStore, { debug: true });
