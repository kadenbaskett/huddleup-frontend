import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { StoreState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const league = useSelector((state: StoreState) => state.league.league);

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ''}
        leagueId={Number(leagueId)}
        page='standings'
      />
      <div>This will display the information of standings - {leagueId}</div>
    </>
  );
}

export default league;
