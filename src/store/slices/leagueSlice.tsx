import { Team } from '@interfaces/league.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeagueInfo, fetchLeaguePlayers } from '@services/apiClient';
import { objectsEqual } from '@services/helpers';
import { SLICE_STATUS } from '@store/slices/common';

export interface leagueSliceState {
  league: any;
  viewingTeam: Team;
  playerList: any[];
  userTeam: Team;
  status: SLICE_STATUS;
  urlLeagueId: number;
  urlTeamId: number;
}

const initialState: leagueSliceState = {
  league: null,
  viewingTeam: null,
  playerList: null,
  userTeam: null,
  status: SLICE_STATUS.IDLE,
  urlLeagueId: null,
  urlTeamId: null,
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {
    resetSlice: (state) => {
      return { ...initialState };
    },
    setURLParams: (state, { payload }) => {
      state.urlLeagueId = payload.leagueIdNumURL;
      state.urlTeamId = payload.teamIdNumURL;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(handleLeagueInitThunk.pending, (state, action) => {})
      .addCase(handleLeagueInitThunk.fulfilled, (state, action) => {
        const data = action.payload;

        if (data.league.id === state.urlLeagueId) {
          if (data.status) {
            const leagueChanged = !objectsEqual(state.league, data.league);
            const leaguePlayersChanged = !objectsEqual(state.playerList, data.players);
            const userTeamChanged = !objectsEqual(state.userTeam, data.userTeam);
            const viewingTeamChanged = !objectsEqual(state.viewingTeam, data.viewingTeam);

            if (leaguePlayersChanged) state.playerList = data.players;

            if (leagueChanged) state.league = data.league;

            if (userTeamChanged) state.userTeam = data.userTeam;

            if (viewingTeamChanged) state.viewingTeam = data.viewingTeam;

            state.urlLeagueId = data.leagueIdURL;
            state.urlTeamId = data.teamIdURL;
            state.status = SLICE_STATUS.SUCCEEDED;
          } else {
            state.status = SLICE_STATUS.FAILED;
          }
        } else {
          // console.log('old request, not updating league info');
        }
      })
      .addCase(handleLeagueInitThunk.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
      });
  },
});

export const handleLeagueInitThunk = createAsyncThunk(
  'league/initLeague',
  async (data: any, { getState }) => {
    const leagueIdURL = data.leagueIdURL;
    const teamIdURL = data.teamIdURL;

    const playersResp = await fetchLeaguePlayers(leagueIdURL);
    const leagueResp = await fetchLeagueInfo(leagueIdURL);
    const userId = getState().user.userInfo.id;

    const teams = leagueResp.data.teams;
    const userTeam = teams.find((team) =>
      team.managers.find((manager) => manager.user_id === userId),
    );
    const viewingTeam = teams.find((team) => team.id === Number(teamIdURL));

    return {
      status: !!leagueResp.data && !!playersResp.data,
      players: playersResp.data,
      league: leagueResp.data,
      userTeam,
      viewingTeam,
      leagueIdURL,
      teamIdURL,
    };
  },
);

export const { resetSlice, setURLParams } = leagueSlice.actions;
export default leagueSlice;
