import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { calculateStandings } from '@services/helpers';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import OverviewCard from './components/OverviewCard/OverviewCard';
import { Activity, TypeActivity, TypeStatus } from './types';

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

function index() {
  const router = useRouter();
  const { leagueId } = router.query;
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const week = useSelector((state: StoreState) => state.global.week);
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
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40'>
          <LeagueHomeNavigation
            leagueId={Number(leagueId)}
            leagueName={league ? league.name : ' '}
            leagueDescription={'This is an example league description'}
            page='overview'
          />
          <OverviewCard
            activities={activityData}
            teams={calculateStandings(league, week).slice(0, 5)}
          />
        </div>
      )}
    </div>
  );
}

export default index;
