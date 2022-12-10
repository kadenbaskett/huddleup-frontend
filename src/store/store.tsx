import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// Import and combine all slices
import playersSlice, { playersSliceState } from '@store/slices/playersSlice';
import userSlice, { userSliceState } from '@store/slices/userSlice';

export interface StoreState {
  players: playersSliceState;
  user: userSliceState;
}

const combinedReducer = combineReducers({
  [playersSlice.name]: playersSlice.reducer,
  [userSlice.name]: userSlice.reducer,
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
      user: {
        user_info: {
          ...state.user.user_info,
          ...action.payload.user.user_info,
        },
        leagues: {
          ...state.user.leagues,
          ...action.payload.user.leagues,
        },
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () => configureStore({ reducer: masterReducer });
export const wrapper = createWrapper(makeStore, { debug: true });
