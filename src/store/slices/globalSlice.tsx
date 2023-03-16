import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { News } from '@interfaces/news.interface';
import {
  fetchNews,
  fetchPrivateLeagues,
  fetchPublicLeagues,
  fetchTimeframe,
} from '@services/apiClient';
import { SLICE_STATUS } from '@store/slices/common';

export interface globalSliceState {
  publicLeagues: League[];
  privateLeagues: League[];
  totalWeeks: number;
  week: number;
  season: number;
  status: SLICE_STATUS;
  seasonComplete: Boolean;
  news: News[];
}

const initialState: globalSliceState = {
  publicLeagues: [],
  privateLeagues: [],
  totalWeeks: 18,
  week: null,
  season: null,
  status: SLICE_STATUS.IDLE,
  seasonComplete: false,
  news: [],
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleGlobalInitThunk.fulfilled, (state, action) => {
        state.status = SLICE_STATUS.SUCCEEDED;
        state.publicLeagues = action.payload.publicLeagues;
        state.privateLeagues = action.payload.privateLeagues;
        state.week = action.payload.timeframe.week;
        state.season = action.payload.timeframe.season;
        state.seasonComplete =
          action.payload.timeframe.has_ended && action.payload.timeframe.week === 18;
        state.news = action.payload.news;
      })
      .addCase(handleGlobalInitThunk.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
      });
  },
});

export const handleGlobalInitThunk = createAsyncThunk('global/init', async () => {
  const publicLeaugesResp = await fetchPublicLeagues();
  const privateLeaugesResp = await fetchPrivateLeagues();

  console.log('Global update');

  const timeframeResp = await fetchTimeframe();
  const news = await fetchNews(5);

  const payload = {
    publicLeagues: publicLeaugesResp.data ? publicLeaugesResp.data : [],
    privateLeagues: privateLeaugesResp.data ? privateLeaugesResp.data : [],
    timeframe: timeframeResp.data ? timeframeResp.data : [],
    news: news.data ? news.data : [],
  };

  return payload;
});

export default globalSlice;
