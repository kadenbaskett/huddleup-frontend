import { useRouter } from 'next/router';
import React from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import StandingsTable from './components/StandingsTable/StandingsTable';
import { calculateStandings } from '@services/helpers';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const league = useSelector((state: StoreState) => state.league.league);
  const week = useSelector((state: StoreState) => state.global.week);
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const team = useSelector((state: StoreState) => state.league.userTeam);

  return (
    <>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='standings'
      />
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='pt-5 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 bg-lightGrey min-h-screen'>
          <StandingsTable teams={calculateStandings(league, week)} week={week} />
        </div>
      )}
    </>
  );
}

export default league;
