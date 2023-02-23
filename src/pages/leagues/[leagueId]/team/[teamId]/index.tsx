import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { NotificationCard } from '@components/NotificationCard/NotificationCard';
import { TeamCard } from '@components/TeamCard/TeamCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid } from '@mantine/core';
import { TeamInfoBanner } from '@components/TeamInfoBanner/TeamInfoBanner';
import { ProposalStatus } from '@interfaces/types.interface';
import { TeamBanner } from '@components/TeamBanner/TeamBanner';

function league() {
  const [proposalNotification, setProposalNotification] = useState(undefined);
  const router = useRouter();
  const { leagueId } = router.query;

  // const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);
  const currentWeek = useSelector((state: StoreState) => state.global.week);
  const user = useSelector((state: StoreState) => state.user.userInfo);

  useEffect(() => {
    const notification = team?.proposed_transactions.find(
      (e) => e.status === ProposalStatus.pending && user.id !== e.user_id,
    );
    setProposalNotification(notification);
  }, [team]);

  // const players = team?.rosters.find((roster) => roster.week === currentWeek)?.players;
  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <>
          <LeagueNavBar
            teamName={team.name}
            teamId={team ? team.id : ' '}
            leagueName={league ? league.name : ' '}
            leagueId={Number(leagueId)}
            page='team'
          />
          <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='pt-5'>
              {proposalNotification && (
                <NotificationCard proposal={proposalNotification} userId={user.id} />
              )}
            </div>
            <div className='pt-5'>
              <Grid>
                <Grid.Col span={6}>
                  <TeamBanner name={team?.name ? team.name : ' '} team={team} />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TeamInfoBanner league={league} week={currentWeek} team={userTeam} />
                </Grid.Col>
              </Grid>
            </div>
            <div className='pt-5'>
              <TeamCard
                currentWeek={currentWeek}
                rosters={team.rosters}
                proposals={team.proposed_transactions}
                userId={user.id}
                isMyTeam={Number(team.id) === Number(userTeam.id)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default league;
