import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';

function league() {
  const store = useSelector((state: StoreState) => state);
  const league = store.league.league;
  const userTeam = store.league.userTeam;

  return (
    <div className='bg-lightGrey min-h-screen'>
      <LeagueNavBar
        teamName={userTeam.name}
        teamId={userTeam.id}
        leagueName={league}
        leagueId={Number(league.id)}
        page='home'
      />

      <LeagueHomeNavigation
        leagueId={Number(league.id)}
        leagueName={league.name}
        leagueDescription={league.description}
        page='overview'
      />
    </div>
  );
}

export default league;
