import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// Import and combine all slices
import leagueSlice, { leagueSliceState } from '@store/slices/leagueSlice';
import userSlice, { userSliceState } from '@store/slices/userSlice';
import globalSlice, { globalSliceState } from '@store/slices/globalSlice';

export interface StoreState {
  league: leagueSliceState;
  user: userSliceState;
  global: globalSliceState;
}

const combinedReducer = combineReducers({
  [leagueSlice.name]: leagueSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [globalSlice.name]: globalSlice.reducer,
});

const masterReducer = (state: StoreState, action) => {
  if (action.type === HYDRATE) {
    const nextState: StoreState = {
      ...state, // use previous state

      // Update each slice
      // TODO update the rest of the league slice
      league: {
        ...state.league,
        playerList: [...action.payload.league.playerList, ...state.league.playerList],
      },
      user: {
        ...state.user,
        userInfo: {
          ...state.user.userInfo,
          ...action.payload.user.userInfo,
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
export const wrapper = createWrapper(makeStore, { debug: false });
