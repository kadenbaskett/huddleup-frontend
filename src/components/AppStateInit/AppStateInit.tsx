import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '@store/store';
import { handleGlobalInitThunk } from '@store/slices/globalSlice';
import { handleUserInitThunk, userPollThunk } from '@store/slices/userSlice';
import { handleLeagueInitThunk, pollForUpdates } from '@store/slices/leagueSlice';
import { SLICE_STATUS } from '@store/slices/common';

export default function AppStateInit({ children }) {
  const router = useRouter();
  const { leagueId } = router.query;

  const state = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [pollingLeagueId, setPollingLeagueId] = useState(null);

  const initLeagueData = (id: number) => {
    dispatch(handleLeagueInitThunk(Number(id)));
    clearTimeout(pollingLeagueId);
    const pollId = setInterval(() => dispatch(pollForUpdates(Number(id))), 5000);
    setPollingLeagueId(pollId);
  };

  const updateLeagueData = (id: number) => {
    dispatch(pollForUpdates(Number(id)));
    clearTimeout(pollingLeagueId);
    const pollId = setInterval(() => dispatch(pollForUpdates(Number(id))), 5000);
    setPollingLeagueId(pollId);
  };

  useEffect(() => {
    if (leagueId && state.league.pollStatus === SLICE_STATUS.NEEDS_UPDATE) {
      updateLeagueData(Number(leagueId));
    }

    // on initial load - init app state
    if (state.global.status === SLICE_STATUS.IDLE) {
      dispatch(handleGlobalInitThunk());
    }

    // If the user hasn't logged in since the page was loaded, check local storage for the login
    if (state.user.status === SLICE_STATUS.IDLE) {
      const userStr = localStorage.getItem('user');

      if (userStr) {
        const userObj = JSON.parse(userStr);

        if (userObj.email) {
          // dispatch(handleUserInitThunk(String(userObj.email)));
        } else {
          localStorage.removeItem('user');
        }
      }
    }

    // TODO check behavior of login/logout on user store

    // Once the user creates an account, fetch their full acount info from the DB
    if (state.user.createUserStatus === SLICE_STATUS.SUCCEEDED) {
      const email = state.user.userInfo.email;
      dispatch(handleUserInitThunk(String(email)));

      if (state.user.pollStatus !== SLICE_STATUS.POLLING) {
        setInterval(() => dispatch(userPollThunk(String(email))), 5000);
      }
    }

    // Once the user is logged in
    if (state.user.status === SLICE_STATUS.SUCCEEDED) {
      // The user is requesting to view a league now (leagueId is in the URL)
      if (leagueId) {
        // If the league hasn't been initialized yet, do that
        if (state.league.status === SLICE_STATUS.IDLE) {
          initLeagueData(Number(leagueId));
        }
        // A league has previously been viewed by the user and put into the store, but the user has now changed the league they are viewing
        else if (
          state.league.status === SLICE_STATUS.SUCCEEDED &&
          state.league.league.id !== Number(leagueId)
        ) {
          initLeagueData(Number(leagueId));
        }
      }
    }
  }, [
    state.user.createUserStatus,
    state.user.status,
    state.global.status,
    state.league.status,
    state.league.pollStatus,
    leagueId,
  ]);

  return children;
}
