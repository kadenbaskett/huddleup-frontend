import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { ThisWeekCard } from '../../../../components/ThisWeekCard/ThisWeekCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

function matchups() {
  const store = useSelector((state: StoreState) => state);
  const league = store.league.league;
  const team = store.league.userTeam;
  const currentWeek = store.global.week;
  return (
    <>
      {!league && !team && !currentWeek && <HuddleUpLoader />}
      {team && league && (
        <>
          <LeagueNavBar
            teamName={team.name}
            teamId={team.id}
            leagueName={league.name}
            leagueId={Number(league.id)}
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
