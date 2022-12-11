import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

// Import and combine all slices
import leagueSlice, { leagueSliceState } from '@store/slices/leagueSlice';
import userSlice, { userSliceState } from '@store/slices/userSlice';

export interface StoreState {
  league: leagueSliceState;
  user: userSliceState;
}

const combinedReducer = combineReducers({
  [leagueSlice.name]: leagueSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

const masterReducer = (state: StoreState, action) => {
  if (action.type === HYDRATE) {
    const nextState: StoreState = {
      ...state, // use previous state

      // Update each slice
      // TODO update the rest of the league slice
      league: {
        ...state.league,
        player_list: [...action.payload.league.player_list, ...state.league.player_list],
        teams: [...action.payload.league.teams, ...state.league.teams],
      },
      user: {
        ...state.user,
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
export const wrapper = createWrapper(makeStore, { debug: false });
