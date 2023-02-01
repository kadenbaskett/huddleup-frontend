import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { NotificationCard } from './components/NotificationCard/NotificationCard';
import { TeamBanner } from '@pages/leagues/[leagueId]/team/[teamId]/components/TeamBanner/TeamBanner';
import { TeamCard } from './components/TeamCard/TeamCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid } from '@mantine/core';
import { TeamInfoBanner } from './components/TeamInfoBanner/TeamInfoBanner';
import { ProposalStatus } from './types';
import { getProposalHeadlineString, proposalToString } from '@services/ProposalHelpers';

function league() {
  const [proposalNotification, setProposalNotification] = useState(undefined);
  const router = useRouter();
  const { leagueId } = router.query;
  const { teamId } = router.query;

  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);
  const currentWeek = useSelector((state: StoreState) => state.global.week);

  const [team, setTeam] = useState(null);

  useEffect(() => {
    const t = league?.teams.find((t) => t.id === Number(teamId));
    setTeam(t);

    setProposalNotification(
      team?.proposed_transactions.find((e) => e.status === ProposalStatus.pending),
    );
  }, [league]);

  if (!team) {
    return <HuddleUpLoader />;
  }
  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <>
          <LeagueNavBar
            teamName={team?.name}
            teamId={team?.id}
            leagueName={league?.name}
            leagueId={Number(leagueId)}
            page='team'
          />
          <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='pt-5'>
              {proposalNotification && Number(userTeam.id) === Number(teamId) && (
                <NotificationCard
                  headline={getProposalHeadlineString(proposalNotification)}
                  text={proposalToString(proposalNotification)}
                />
              )}
            </div>
            <div className='pt-5'>
              <Grid>
                <Grid.Col span={6}>
                  <TeamBanner
                    name={team?.name ? team.name : ' '}
                    managers={team?.managers ? team.managers : []}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TeamInfoBanner
                    teamName={team?.name}
                    lastMatchupOpponentName={'opponent name'}
                    lastMatchupOpponentScore={10}
                    lastMatchupPersonalScore={20}
                    nextMatchupOpponentName={'next opponent name'}
                  />
                </Grid.Col>
              </Grid>
            </div>
            <div className='pt-5'>
              <TeamCard
                currentWeek={currentWeek}
                rosters={team?.rosters}
                proposals={team?.proposed_transactions}
                isMyTeam={Number(teamId) === Number(userTeam.id)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default league;
