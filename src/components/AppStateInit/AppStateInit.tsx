import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '@store/store';
import { handleGlobalInitThunk } from '@store/slices/globalSlice';
import { handleUserInitThunk } from '@store/slices/userSlice';
import { handleLeagueInitThunk } from '@store/slices/leagueSlice';

export default function AppStateInit({ children }) {
  const router = useRouter();
  const { leagueId } = router.query;

  const state = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();

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

    // Once the user creates an account, fetch their full acount info from the DB
    if (state.user.createUserStatus === 'succeeded') {
      const email = state.user.userInfo.email;
      dispatch(handleUserInitThunk(String(email)));
    }

    // Once the user is logged in
    if (state.user.status === 'succeeded') {
      // Once the URL has a league id in it, fetch it
      if (state.league.status === 'idle' && leagueId) {
        dispatch(handleLeagueInitThunk(Number(leagueId)));
      }

      // Add any other things that need to be initialized after a login
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
