import { Team } from '@interfaces/league.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeagueInfo, fetchLeaguePlayers } from '@services/apiClient';
import { SLICE_STATUS } from '@store/slices/common';

export interface leagueSliceState {
  league: any;
  viewingTeam: Team;
  playerList: any[];
  userTeam: Team;
  transactions: any[];
  status: SLICE_STATUS;
  urlLeagueId: number;
  urlTeamId: number;
}

const initialState: leagueSliceState = {
  league: null,
  viewingTeam: null,
  playerList: null,
  userTeam: null,
  transactions: null,
  status: SLICE_STATUS.IDLE,
  urlLeagueId: null,
  urlTeamId: null,
};

export const leagueSlice = createSlice({
  name: 'league',

  initialState,

  reducers: {
    clearLeagueStatus: (state) => {
      state.status = SLICE_STATUS.IDLE;
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
          // console.log('Updating the league info: ', data.league.id);
          if (data.status) {
            state.playerList = data.players;
            state.league = data.league;
            state.userTeam = data.userTeam;
            state.viewingTeam = data.viewingTeam;
            state.urlLeagueId = data.leagueIdURL;
            state.urlTeamId = data.teamIdURL;
            state.status = SLICE_STATUS.SUCCEEDED;
          } else {
            state.status = SLICE_STATUS.FAILED;
          }
        } else {
          // console.log('old request, not updating league info');
          console.log(data.league.id, state.urlLeagueId);
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

export const { clearLeagueStatus, setURLParams } = leagueSlice.actions;
export default leagueSlice;
