import React from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';
import StandingsTable from './components/StandingsTable/StandingsTable';
import { calculateStandings } from '@services/helpers';

function league() {
  const store = useSelector((state: StoreState) => state);
  const league = store.league.league;
  const week = store.global.week;
  const userTeam = store.league.userTeam;

  return (
    <>
      <LeagueNavBar
        teamName={userTeam.name}
        teamId={userTeam.id}
        leagueName={league.name}
        leagueId={league.id}
        page='standings'
      />
      <div className='pt-5 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 bg-lightGrey min-h-screen'>
        <StandingsTable teams={calculateStandings(league, week)} week={week} />
      </div>
    </>
  );
}

export default league;
