import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Team } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import { calculateStandings } from '@services/helpers';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RosterCard } from './components/RosterCard/RosterCard';

// const createRosterCards = (league: League) => {
//   league.teams.map((team) => {
//     return createRosterCard(team);
//   });
// };

const createRosterCard = (team: Team, leagueID: number) => {
  return <RosterCard team={team} leagueID={leagueID} />;
};

export function index() {
  const router = useRouter();
  const { leagueId } = router.query;

  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const week = useSelector((state: StoreState) => state.global.week);
  return (
    <div>
      <LeagueNavBar
        teamName='team name'
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
            leagueDescription={'This is an example league description'}
            page='teams'
          />
          {/* <>{createRosterCards(league)}</> */}
          <div className='bg-lightGrey pt-10 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <Grid>
              {calculateStandings(league, week).map((team) => {
                console.log('team', team);
                return createRosterCard(team, leagueId);
              })}
            </Grid>
          </div>
        </>
      )}
    </div>
  );
}

export default index;
