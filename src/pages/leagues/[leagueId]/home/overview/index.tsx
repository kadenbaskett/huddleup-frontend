import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { calculateStandings } from '@services/helpers';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import OverviewCard from '@components/OverviewCard/OverviewCard';

function index() {
  const store = useSelector((state: StoreState) => state);
  const league = store.league.league;
  const week = store.global.week;
  const userTeam = store.league.userTeam;

  let allTransactions = [];

  const teams = league ? league.teams : [];

  for (const t of teams) {
    allTransactions = allTransactions.concat(t.proposed_transactions);
  }

  const completed = allTransactions.filter((t) => t.status === 'Complete');
  const sorted = completed.sort(
    (a, b) => new Date(a.execution_date).getTime() - new Date(b.execution_date).getTime(),
  );
  const activityData = sorted.slice(0, 10);

  return (
    <div className='bg-lightGrey min-h-screen'>
      <LeagueNavBar
        teamName={userTeam.name}
        teamId={userTeam.id}
        leagueName={league.name}
        leagueId={league.id}
        page='home'
      />
      <div className='pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40'>
        <LeagueHomeNavigation
          leagueId={league.id}
          leagueName={league.name}
          leagueDescription={league.description}
          page='overview'
        />
        <OverviewCard
          activities={activityData || []}
          teams={calculateStandings(league, week).slice(0, 5)}
        />
      </div>
    </div>
  );
}

export default index;
