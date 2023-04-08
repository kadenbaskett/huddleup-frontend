import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import leagueSlice, { leagueSliceState } from '@store/slices/leagueSlice';
import userSlice, { userSliceState } from '@store/slices/userSlice';
import globalSlice, { globalSliceState } from '@store/slices/globalSlice';
import draftSlice, { draftSliceState } from '@store/slices/draftSlice';
import draftMiddleware from '@store/middleware/socket';

export interface StoreState {
  league: leagueSliceState;
  user: userSliceState;
  global: globalSliceState;
  draft: draftSliceState;
}

const combinedReducer = combineReducers({
  [leagueSlice.name]: leagueSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [globalSlice.name]: globalSlice.reducer,
  [draftSlice.name]: draftSlice.reducer,
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

const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload'],
        },
      }).concat([draftMiddleware]);
    },
  });
export const wrapper = createWrapper(makeStore, { debug: false });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type AppDispatch = ReturnType<AppStore['dispatch']>;
