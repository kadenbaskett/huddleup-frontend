import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { NotificationCard } from './components/NotificationCard/NotificationCard';
import { TeamBanner } from '@pages/leagues/[leagueId]/team/components/TeamBanner/TeamBanner';
import { TeamCard } from './components/TeamCard/TeamCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid } from '@mantine/core';
import { TeamInfoBanner } from './components/TeamInfoBanner/TeamInfoBanner';
import { Proposal, ProposalStatus } from './types';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  // const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);
  const currentWeek = useSelector((state: StoreState) => state.global.week);

  const players = team?.rosters.find((roster) => roster.week === currentWeek)?.players;

  // static data to be changed
  const proposals: Proposal[] = [
    {
      id: 3,
      name: 'Joe Rodman',
      proposal: 'Trade Deshaun Watson for Michael Carter ',
      status: ProposalStatus.pending,
    },
    {
      id: 2,
      name: 'Jake White',
      proposal: 'Trade Michael Carter for Deshaun Watson',
      status: ProposalStatus.rejected,
    },
    {
      id: 1,
      name: 'Jake White',
      proposal: 'Drop Aaron Rodgers',
      status: ProposalStatus.approved,
    },
  ];

  return (
    <>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='team'
      />
      {leagueInfoFetchStatus === 'loading' && <HuddleUpLoader />}
      {leagueInfoFetchStatus !== 'loading' && (
        <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
          <div className='pt-5'>
            <NotificationCard text='Joe would like to trade Deshaun Watson for Michael Carter' />
          </div>
          <div className='pt-5'>
            <Grid>
              <Grid.Col span={6}>
                <TeamBanner
                  name='Test Team Name'
                  members={['Jake White', 'Joe Rodman', 'Justin Perez']}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TeamInfoBanner
                  teamName={'team name'}
                  lastMatchupOpponentName={'opponent name'}
                  lastMatchupOpponentScore={10}
                  lastMatchupPersonalScore={20}
                  nextMatchupOpponentName={'next opponent name'}
                />
              </Grid.Col>
            </Grid>
          </div>
          <div className='pt-5'>
            <TeamCard currentWeek={4} players={players} proposals={proposals} />
          </div>
        </div>
      )}
    </>
  );
}

export default league;
