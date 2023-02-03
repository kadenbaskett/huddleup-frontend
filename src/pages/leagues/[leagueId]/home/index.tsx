import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);

  return (
    <div className='bg-lightGrey min-h-screen'>
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
        leagueDescription={league ? league.description : ' '}
        page='overview'
      />
    </div>
  );
}

export default league;
