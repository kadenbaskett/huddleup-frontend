import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { AppDispatch, StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const league = useSelector((state: StoreState) => state.league.league);

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);

  return (
    <div className='bg-lightGrey min-h-screen'>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='home'
      />
      <LeagueHomeNavigation
        leagueId={Number(leagueId)}
        leagueName={league ? league.name : ' '}
        leagueDescription={'This is an example league description'}
        page='overview'
      />
    </div>
  );
}

export default league;
