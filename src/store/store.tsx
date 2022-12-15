import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
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
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () => configureStore({ reducer: masterReducer });
export const wrapper = createWrapper(makeStore, { debug: false });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
