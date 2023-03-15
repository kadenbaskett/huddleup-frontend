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
  const { leagueId, teamId } = router.query;

  // const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);
  const currentWeek = useSelector((state: StoreState) => state.global.week);
  const user = useSelector((state: StoreState) => state.user.userInfo);

  const team = league?.teams?.find((t) => t.id === Number(teamId));

  const isMyTeam = team && userTeam ? Number(team.id) === Number(userTeam.id) : false;

  const rosters = team?.rosters;

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
            {/* {!isMyTeam ? (<div className='pt-5'>
                <Link href={`/leagues/${Number(leagueId)}/team/${Number(userTeam.id)}`}>
                  <Button
                    className='hover:bg-transparent hover:text-green text-xl hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                    variant='default'
                    size='sm'
                  >
                    View My Team
                  </Button>
                </Link>
            </div>) : <></>} */}
            <div className='pt-5'>
              {proposalNotification && isMyTeam && (
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
                rosters={rosters}
                proposals={team.proposed_transactions}
                userId={user.id}
                isMyTeam={isMyTeam}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default league;
