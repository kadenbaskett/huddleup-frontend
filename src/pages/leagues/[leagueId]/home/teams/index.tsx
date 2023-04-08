import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import RosterGrid from '@components/RosterGrid/RosterGrid';

export function index() {
  const league = useSelector((state: StoreState) => state.league.league);
  const week = useSelector((state: StoreState) => state.global.week);
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);

  return (
    <div>
      <LeagueNavBar
        teamName={userTeam.name}
        teamId={userTeam.id}
        leagueName={league.name}
        leagueId={league.id}
        page='home'
      />
      <>
        <LeagueHomeNavigation
          leagueId={league.id}
          leagueName={league.name}
          leagueDescription={league.description}
          page='teams'
        />
        <div className='bg-lightGrey pt-2 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
          <div className='content-center'>
            <RosterGrid league={league} week={week} leagueId={league.id} />
          </div>
        </div>
      </>
    </div>
  );
}

export default index;
