import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '@store/store';
import { handleGlobalInitThunk } from '@store/slices/globalSlice';
import { handleUserInitThunk, userPollThunk } from '@store/slices/userSlice';
import { handleLeagueInitThunk, pollForUpdates } from '@store/slices/leagueSlice';

export default function AppStateInit({ children }) {
  const router = useRouter();
  const { leagueId } = router.query;

  const state = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const [pollingLeagueId, setPollingLeagueId] = useState(null);

  const initLeague = (id: number) => {
    dispatch(handleLeagueInitThunk(Number(id)));
    clearTimeout(pollingLeagueId);
    const pollId = setInterval(() => dispatch(pollForUpdates(Number(id))), 5000);
    setPollingLeagueId(pollId);
  };

  useEffect(() => {
    // on initial load - init app state
    if (state.global.status === 'idle') {
      dispatch(handleGlobalInitThunk());
    }

    // If the user hasn't logged in since the page was loaded, check local storage for the login
    if (state.user.status === 'idle') {
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
    if (state.user.createUserStatus === 'succeeded') {
      const email = state.user.userInfo.email;
      dispatch(handleUserInitThunk(String(email)));

      if (state.user.pollStatus !== 'polling') {
        setInterval(() => dispatch(userPollThunk(String(email))), 5000);
      }
    }

    // Once the user is logged in
    if (state.user.status === 'succeeded') {
      // The user is requesting to view a league now (leagueId is in the URL)
      if (leagueId) {
        // If the league hasn't been initialized yet, do that
        if (state.league.status === 'idle') {
          initLeague(Number(leagueId));
        }
        // A league has previously been viewed by the user and put into the store, but the user has now changed the league they are viewing
        else if (
          state.league.status === 'succeeded' &&
          state.league.league.id !== Number(leagueId)
        ) {
          initLeague(Number(leagueId));
        }
      }
    }
  }, [
    state.user.createUserStatus,
    state.user.status,
    state.global.status,
    state.league.status,
    leagueId,
  ]);

  return children;
}
