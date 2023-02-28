import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { ThisWeekCard } from '../../../../components/ThisWeekCard/ThisWeekCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

function matchups() {
  const router = useRouter();
  const { leagueId } = router.query;
  const league = useSelector((state: StoreState) => state.league.league);
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const team = useSelector((state: StoreState) => state.league.userTeam);
  const currentWeek = useSelector((state: StoreState) => state.global.week);

  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <>
          <LeagueNavBar
            teamName={team ? team.name : ' '}
            teamId={team ? team.id : 0}
            leagueName={league ? league.name : ' '}
            leagueId={Number(leagueId)}
            page='matchups'
          />
          <div className='bg-lightGrey lg:pl-10 lg:pr-10 md:pr-5 md:pl-5 sm:pr-0 sm:pl-0 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='pt-5 pl-1 pr-1 pb-5'>
              <ThisWeekCard league={league} currentWeek={currentWeek} team={team} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default matchups;
