import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { League } from '@interfaces/league.interface';
import { News } from '@interfaces/news.interface';
import { fetchNews, fetchPublicLeagues, fetchTimeframe } from '@services/apiClient';

export interface globalSliceState {
  publicLeagues: League[];
  totalWeeks: number;
  week: number;
  season: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  seasonComplete: Boolean;
  news: News[];
}

const initialState: globalSliceState = {
  publicLeagues: [],
  totalWeeks: 18,
  week: null,
  season: null,
  status: 'idle',
  seasonComplete: false,
  news: [],
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(handleGlobalInitThunk.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(handleGlobalInitThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.publicLeagues = action.payload.leagues;
        state.week = action.payload.timeframe.week;
        state.season = action.payload.timeframe.season;
        state.seasonComplete =
          action.payload.timeframe.has_ended && action.payload.timeframe.week === 18;
        state.news = action.payload.news;
      })
      .addCase(handleGlobalInitThunk.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const handleGlobalInitThunk = createAsyncThunk('global/init', async () => {
  const publicLeaugesResp = await fetchPublicLeagues();
  const timeframeResp = await fetchTimeframe();
  const news = await fetchNews(5);

  const payload = {
    leagues: publicLeaugesResp.data ? publicLeaugesResp.data : [],
    timeframe: timeframeResp.data ? timeframeResp.data : [],
    news: news.data ? news.data : [],
  };

  return payload;
});

export default globalSlice;
