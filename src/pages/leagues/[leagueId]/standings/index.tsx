import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import StandingsTable from './components/StandingsTable/StandingsTable';
import { Team } from '../home/overview/types';
import { calculateStandings } from '@services/helpers';

const teams: Team[] = [
  {
    id: 0,
    name: 'Justins Team',
    managers: 'Justin, Scotty, Eddie',
    rank: 1,
    wins: 10,
    losses: 0,
  },
  {
    id: 1,
    name: 'Jakes Team',
    managers: 'Jake, Garrett, Brooke',
    rank: 2,
    wins: 9,
    losses: 1,
  },
  {
    id: 2,
    name: 'Kadens Team',
    managers: 'Kaden, Trent, MattMarsh',
    rank: 3,
    wins: 8,
    losses: 2,
  },
  {
    id: 3,
    name: 'Joes Team',
    managers: 'Joe, Isaac, Kyle',
    rank: 4,
    wins: 5,
    losses: 5,
  },
  {
    id: 4,
    name: 'Some bums Team',
    managers: 'Bum1, Bum2, Bum3',
    rank: 5,
    wins: 0,
    losses: 10,
  },
];

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const league = useSelector((state: StoreState) => state.league.league);
  const week = useSelector((state: StoreState) => state.global.week);
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const team = useSelector((state: StoreState) => state.league.userTeam);

  useEffect(() => {
    if (leagueInfoFetchStatus === 'succeeded') {
      const standings = calculateStandings(league, week);
      const sorted = standings.sort((teamOne, teamTwo) => teamTwo.wins - teamOne.wins);
      console.log(sorted);
    }
  }, [leagueInfoFetchStatus]);

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
          <StandingsTable teams={teams} />
        </div>
      )}
    </>
  );
}

export default league;
