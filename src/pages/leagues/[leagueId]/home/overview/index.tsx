import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import OverviewCard from './components/OverviewCard/OverviewCard';
import { Activity, Team, TypeActivity, TypeStatus } from './types';

const date: Date = new Date();

const activityData: Activity[] = [
  {
    id: 0,
    teamId: 1,
    relatedTeamId: 0,
    status: TypeStatus.Completed,
    type: TypeActivity.Add,
    createdDate: date,
    expirationDate: date,
    closingDate: date,
    week: 15,
  },
  {
    id: 0,
    teamId: 1,
    relatedTeamId: 0,
    status: TypeStatus.Completed,
    type: TypeActivity.Drop,
    createdDate: date,
    expirationDate: date,
    closingDate: date,
    week: 15,
  },
  {
    id: 0,
    teamId: 1,
    relatedTeamId: 0,
    status: TypeStatus.Completed,
    type: TypeActivity.DropAdd,
    createdDate: date,
    expirationDate: date,
    closingDate: date,
    week: 15,
  },
  {
    id: 0,
    teamId: 1,
    relatedTeamId: 0,
    status: TypeStatus.Completed,
    type: TypeActivity.Trade,
    createdDate: date,
    expirationDate: date,
    closingDate: date,
    week: 15,
  },
];

const teams: Team[] = [
  {
    id: 0,
    name: 'Justins Team',
    rank: 1,
    wins: 10,
    losses: 0,
  },
  {
    id: 1,
    name: 'Jakes Team',
    rank: 2,
    wins: 9,
    losses: 1,
  },
  {
    id: 2,
    name: 'Kadens Team',
    rank: 3,
    wins: 8,
    losses: 2,
  },
  {
    id: 3,
    name: 'Joes Team',
    rank: 4,
    wins: 5,
    losses: 5,
  },
  {
    id: 4,
    name: 'Some bums Team',
    rank: 5,
    wins: 0,
    losses: 10,
  },
];

function index() {
  const router = useRouter();
  const { leagueId } = router.query;
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);

  return (
    <div className='bg-lightGrey min-h-screen'>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='home'
      />
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40'>
          <LeagueHomeNavigation
            leagueId={Number(leagueId)}
            leagueName={league ? league.name : ' '}
            leagueDescription={'This is an example league description'}
            page='overview'
          />
          <OverviewCard activities={activityData} teams={teams} />
        </div>
      )}
    </div>
  );
}

export default index;
