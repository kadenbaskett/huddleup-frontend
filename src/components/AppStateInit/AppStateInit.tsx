import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '@store/store';
import { handleGlobalInitThunk } from '@store/slices/globalSlice';
import { handleLeagueInitThunk } from '@store/slices/leagueSlice';
import { SLICE_STATUS } from '@store/slices/common';
import { TIMEOUTS } from 'static';

export default function AppStateInit({ children }) {
  const router = useRouter();
  const { leagueId } = router.query;

  const state = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();

  let leaguePollTimeoutID = null;
  let globalPollTimeoutID = null;

  const startLeagueSliceUpdateLoop = (id: number) => {
    dispatch(handleLeagueInitThunk(Number(id)));
    clearInterval(leaguePollTimeoutID);
    leaguePollTimeoutID = setInterval(
      () => dispatch(handleLeagueInitThunk(Number(id))),
      TIMEOUTS.LEAGUE,
    );
  };

  const startGlobalSliceUpdateLoop = () => {
    dispatch(handleGlobalInitThunk());
    clearInterval(globalPollTimeoutID);
    globalPollTimeoutID = setInterval(() => dispatch(handleGlobalInitThunk()), TIMEOUTS.GLOBAL);
  };

  useEffect(() => {
    const firstGlobalUpdate = state.global.status === SLICE_STATUS.IDLE;
    const firstLeagueUpdate = state.league.status === SLICE_STATUS.IDLE;

    const viewingNewLeague =
      state.league.status === SLICE_STATUS.SUCCEEDED && state.league.league.id !== Number(leagueId);
    const userLoggedIn = state.user.status === SLICE_STATUS.SUCCEEDED;

    if (firstGlobalUpdate) {
      startGlobalSliceUpdateLoop();
    }

    if (userLoggedIn && leagueId && (firstLeagueUpdate || viewingNewLeague)) {
      startLeagueSliceUpdateLoop(Number(leagueId));
    }
  }, [state.user.status, state.global.status, state.league.status, leagueId]);

  return children;
}
