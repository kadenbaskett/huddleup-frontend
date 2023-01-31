import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { AppDispatch, StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function index() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);
  return (
    <div>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='home'
      />
      <LeagueHomeNavigation
        leagueId={Number(leagueId)}
        leagueName={league ? league.name : ' '}
        leagueDescription={'This is an example league description'}
        page='settings'
      />
      <div>This is the settings page for a league</div>
    </div>
  );
}

export default index;
