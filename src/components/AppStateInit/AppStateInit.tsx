import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '@store/store';
import { handleGlobalInitThunk } from '@store/slices/globalSlice';
import { resetSlice, handleLeagueInitThunk, setURLParams } from '@store/slices/leagueSlice';
import { SLICE_STATUS } from '@store/slices/common';
import { TIMEOUTS } from 'static';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

let leaguePollTimeoutID = null;
let globalPollTimeoutID = null;

export default function AppStateInit({ children }) {
  const router = useRouter();

  let { leagueId } = router.query;
  let { teamId } = router.query;

  let leagueInURL = leagueId !== undefined;
  let teamInURL = teamId !== undefined;

  const state = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();

  let leagueFetched = state.league.status === SLICE_STATUS.SUCCEEDED;
  let userFetched = state.user.status === SLICE_STATUS.SUCCEEDED;
  let globalFetched = state.global.status === SLICE_STATUS.SUCCEEDED;
  let userLoggedIn = state.user.status === SLICE_STATUS.SUCCEEDED;
  let areRostersReadyForCurrentWeek = true;

  const startLeagueSliceUpdateLoop = (leagueIdParam: number, teamIdParam: number) => {
    const data: any = { leagueIdURL: leagueIdParam, teamIdURL: teamIdParam };

    clearInterval(leaguePollTimeoutID);

    dispatch(handleLeagueInitThunk(data));

    leaguePollTimeoutID = setInterval(() => dispatch(handleLeagueInitThunk(data)), TIMEOUTS.LEAGUE);
  };

  const startGlobalSliceUpdateLoop = () => {
    dispatch(handleGlobalInitThunk());
    clearInterval(globalPollTimeoutID);
    globalPollTimeoutID = setInterval(() => dispatch(handleGlobalInitThunk()), TIMEOUTS.GLOBAL);
  };

  useEffect(() => {
    leagueId = router.query.leagueId;
    teamId = router.query.teamId;

    const leagueIdNumURL = Number(leagueId);
    const teamIdNumURL = Number(teamId);

    userLoggedIn = state.user.status === SLICE_STATUS.SUCCEEDED;
    leagueFetched = state.league.status === SLICE_STATUS.SUCCEEDED;
    globalFetched = state.global.status === SLICE_STATUS.SUCCEEDED;
    userFetched = state.user.status === SLICE_STATUS.SUCCEEDED;

    const firstGlobalUpdate = state.global.status === SLICE_STATUS.IDLE;

    leagueInURL = leagueId !== undefined;
    teamInURL = teamId !== undefined;
    const storeLeagueID = state.league.league?.id;
    const storeURLLeagueID = state.league.urlLeagueId;
    const storeTeamID = state.league.urlTeamId;
    const URLMatchesStore =
      leagueInURL && storeLeagueID === leagueIdNumURL && storeURLLeagueID === leagueIdNumURL;

    const teamURLMatchesStore = teamInURL && storeTeamID === teamIdNumURL;

    dispatch(setURLParams({ leagueIdNumURL, teamIdNumURL }));

    if (firstGlobalUpdate) {
      startGlobalSliceUpdateLoop();
    }

    if (userLoggedIn) {
      if (!leagueInURL) {
        dispatch(resetSlice());
        clearInterval(leaguePollTimeoutID);
      } else if (leagueInURL && !URLMatchesStore) {
        startLeagueSliceUpdateLoop(leagueIdNumURL, teamIdNumURL);
      } else if (teamInURL && !teamURLMatchesStore) {
        startLeagueSliceUpdateLoop(leagueIdNumURL, teamIdNumURL);
      }
    }
  }, [state.user.status, state.global.status, state.league.status, state.global.week, router]);

  if (leagueFetched) {
    let currentRosters = 0;

    for (const team of state.league.league.teams) {
      for (const roster of team.rosters) {
        if (roster.week === state.global.week) {
          currentRosters++;
        }
      }
    }

    areRostersReadyForCurrentWeek = currentRosters === state.league.league.teams.length;
  }

  if (leagueId) {
    // Make sure the league has been fetched since the week was updated
    if (!leagueFetched || (teamInURL && !areRostersReadyForCurrentWeek)) {
      return <HuddleUpLoader />;
    } else {
      return children;
    }
  } else if (userLoggedIn) {
    if (!userFetched) {
      return <HuddleUpLoader />;
    } else {
      return children;
    }
  } else {
    if (!globalFetched) {
      return <HuddleUpLoader />;
    } else {
      return children;
    }
  }
}
