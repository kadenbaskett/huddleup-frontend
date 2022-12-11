import { fetchUserLeaguesThunk } from '@store/slices/userSlice';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const leagues = useSelector((state: StoreState) => state.user.leagues);
  const userFetchStatus = useSelector((state: StoreState) => state.user.status);
  const league = leagues.find((l) => l.id === Number(leagueId));

  useEffect(() => {
    console.log('Use effect');
    if (userFetchStatus === 'idle') {
      dispatch(fetchUserLeaguesThunk());
    }
  }, [userFetchStatus, dispatch]);

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ''}
        leagueId={Number(leagueId)}
        page='team'
      />
      <div>This will display the team information of league - {leagueId}</div>
    </>
  );
}

export default league;
