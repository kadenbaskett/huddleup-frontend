import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '@store/store';
import { handleGlobalInitThunk } from '@store/slices/globalSlice';
import { clearLeagueStatus, handleLeagueInitThunk, setURLParams } from '@store/slices/leagueSlice';
import { SLICE_STATUS } from '@store/slices/common';
import { TIMEOUTS } from 'static';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

let leaguePollTimeoutID = null;
let globalPollTimeoutID = null;

export default function AppStateInit({ children }) {
  const router = useRouter();
  let { leagueId } = router.query;
  let { teamId } = router.query;

  const state = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();

  let leagueFetched = state.league.status === SLICE_STATUS.SUCCEEDED;

  const startLeagueSliceUpdateLoop = (leagueIdParam: number, teamIdParam: number) => {
    // console.log('Start league slice update loop for league id: ', leagueIdParam);

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
    leagueFetched = state.league.status === SLICE_STATUS.SUCCEEDED;
  }, [state.league.status]);

  useEffect(() => {
    leagueId = router.query.leagueId;
    teamId = router.query.teamId;

    const leagueIdNumURL = Number(leagueId);
    const teamIdNumURL = Number(teamId);

    const firstGlobalUpdate = state.global.status === SLICE_STATUS.IDLE;
    const userLoggedIn = state.user.status === SLICE_STATUS.SUCCEEDED;

    const leagueInURL = leagueId !== undefined;
    const storeLeagueID = state.league.league?.id;
    const URLMatchesStore = leagueInURL && storeLeagueID === leagueIdNumURL;

    dispatch(setURLParams({ leagueIdNumURL, teamIdNumURL }));

    if (firstGlobalUpdate) {
      startGlobalSliceUpdateLoop();
    }

    if (userLoggedIn) {
      if (!leagueInURL) {
        dispatch(clearLeagueStatus());
        clearInterval(leaguePollTimeoutID);
      } else if (leagueInURL && !URLMatchesStore) {
        startLeagueSliceUpdateLoop(leagueIdNumURL, teamIdNumURL);
      }
    }
  }, [state.user.status, state.global.status, state.league.status, router]);

  if (leagueId) {
    if (!leagueFetched) {
      return <HuddleUpLoader />;
    } else {
      return children;
    }
  } else {
    return children;
  }
}
