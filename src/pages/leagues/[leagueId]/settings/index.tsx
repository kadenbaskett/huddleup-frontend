import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';

function league() {
  const league = useSelector((state: StoreState) => state.league.league);
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);

  return (
    <>
      <LeagueNavBar
        teamName={userTeam.name}
        teamId={userTeam.id}
        leagueName={league.name}
        leagueId={league.id}
        page='settings'
      />
      <div>This will display the settings of league - {league.id}</div>
    </>
  );
}

export default league;
