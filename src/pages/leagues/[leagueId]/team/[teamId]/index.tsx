import { StoreState } from '@store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { NotificationCard } from '@components/NotificationCard/NotificationCard';
import { TeamCard } from '@components/TeamCard/TeamCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid } from '@mantine/core';
import { TeamInfoBanner } from '@components/TeamInfoBanner/TeamInfoBanner';
import { ProposalStatus, ProposalType } from '@interfaces/types.interface';
import { TeamBanner } from '@components/TeamBanner/TeamBanner';
import { SLICE_STATUS } from '@store/slices/common';

function league() {
  const [proposalNotification, setProposalNotification] = useState(undefined);

  const store = useSelector((state: StoreState) => state);

  const leagueInfoFetchStatus: String = store.league.status;
  const league = store.league.league;
  const viewingTeam = store.league.viewingTeam;
  const userTeam = store.league.userTeam;
  const user = store.user.userInfo;
  const currentWeek = store.global.week;

  const rosters = viewingTeam.rosters;
  const isMyTeam = viewingTeam.id === userTeam?.id;
  const leagueFetched = leagueInfoFetchStatus === SLICE_STATUS.SUCCEEDED;

  useEffect(() => {
    const notification = userTeam?.proposed_transactions.find(
      (e) => e.status === ProposalStatus.pending && user.id !== e.user_id,
    );
    setProposalNotification(notification);
  }, [userTeam]);

  return (
    <>
      {!leagueFetched && <HuddleUpLoader />}
      {leagueFetched && user && (
        <>
          <LeagueNavBar
            teamName={viewingTeam.name}
            teamId={viewingTeam.id}
            leagueName={league.name}
            leagueId={league.id}
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
                  <TeamBanner name={viewingTeam.name} team={viewingTeam} />
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
                proposals={[
                  ...viewingTeam.proposed_transactions,
                  ...viewingTeam.related_transactions.filter((p) => p.type === ProposalType.trade),
                ]}
                teamId={viewingTeam.id}
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
