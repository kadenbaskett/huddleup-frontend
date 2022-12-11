import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeagueNavBar from '../../../../components/LeagueNavBar/LeagueNavBar';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const playerFetchStatus = useSelector((state: StoreState) => state.league.status);

  useEffect(() => {
    console.log('Use effect');
    if (playerFetchStatus === 'idle') {
      dispatch(fetchLeagueInfoThunk(9));
    }
  }, [playerFetchStatus, dispatch]);

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName='league name'
        leagueId={Number(leagueId)}
        page='home'
      />
      <div>This will display the home information of league - {leagueId}</div>
    </>
  );
}

export default league;
