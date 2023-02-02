import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import RosterGrid from './components/RosterGrid/RosterGrid';

export function index() {
  const router = useRouter();
  const { leagueId } = router.query;

  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const week = useSelector((state: StoreState) => state.global.week);
  const team = useSelector((state: StoreState) => state.league.userTeam);
  return (
    <div>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='home'
      />
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <>
          <LeagueHomeNavigation
            leagueId={Number(leagueId)}
            leagueName={league ? league.name : ' '}
            leagueDescription={league ? league.description : ' '}
            page='teams'
          />
          <div className='bg-lightGrey pt-2 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='content-center'>
              <RosterGrid league={league} week={week} leagueId={leagueId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default index;
