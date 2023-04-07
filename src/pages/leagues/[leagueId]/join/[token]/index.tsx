import DraftNotificationCard from '@components/DraftNotificationCard/DraftNotificationCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import JoinTeamByToken from '@components/JoinTeamByToken/JoinTeamByToken';
import { Group, Button } from '@mantine/core';
import { fillLeague, startDraft } from '@services/apiClient';
import { StoreState } from '@store/store';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeagueCard from '../../../../../components/LeagueCard/LeagueCard';
import LeagueTeamCard from '../../../../../components/LeagueTeamCard/LeagueTeamCard';

export default function index() {
  const store = useSelector((state: StoreState) => state);
  const user = store.user;
  const userInfoFetchStatus: String = store.user.status;
  const leagueInfoFetchStatus: String = store.league.status;
  const league = store.league.league;
  const [JoinTeamByTokenPopUp, setJoinTeamByTokenPopUp] = useState(false);
  // const draftTime = useSelector(
  //   (state: StoreState) => state.league.league?.settings.draft_settings.date,
  // );
  // const draftCompleted = useSelector((state: StoreState) => false); // TODO put draft complete into database
  // const draftInProgress = new Date(draftTime).getTime() < new Date().getTime() && !draftCompleted;
  const needToFillLeague = league?.teams.length !== league?.settings.num_teams;
  const isCommissioner = league?.commissioner_id === user?.userInfo.id;

  const managerIDs: number[] = [];
  league?.teams.forEach((team) => {
    team.managers.forEach((manager) => {
      managerIDs.push(manager.user_id);
    });
  });

  const teamTokens: string[] = [];
  league?.teams?.forEach((team) => {
    if (team.managers.length < league.settings.max_players) {
      return teamTokens.push(team.token);
    }
  });

  const onJoinTeamByTokenClick = (event) => {
    event.preventDefault();
    setJoinTeamByTokenPopUp(true);
  };

  const onJoinTeamByTokenClose = () => {
    setJoinTeamByTokenPopUp(false);
  };

  const clickFillLeague = async () => {
    await fillLeague(league.id);
  };

  const clickStartDraft = async () => {
    await startDraft(league.id);
  };

  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && userInfoFetchStatus !== 'succeeded' && (
        <HuddleUpLoader />
      )}
      {leagueInfoFetchStatus === 'succeeded' && userInfoFetchStatus === 'succeeded' && (
        <>
          <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='pt-5'>
              <Link href='/leagues'>
                <Button
                  className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  radius='lg'
                  size='lg'
                >
                  Back To Your Leagues
                </Button>
              </Link>
              {needToFillLeague && isCommissioner && (
                <Button
                  className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  radius='lg'
                  size='lg'
                  onClick={async () => await clickFillLeague()}
                >
                  Fill League
                </Button>
              )}
              {!needToFillLeague && isCommissioner && (
                <Button
                  className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  radius='lg'
                  size='lg'
                  onClick={async () => await clickStartDraft()}
                >
                  Start Draft
                </Button>
              )}
            </div>
            <div className='pt-5'>
              {leagueInfoFetchStatus === 'succeeded' && <DraftNotificationCard league={league} />}
            </div>
            <div className='pt-5'>
              <LeagueCard league={league} />
            </div>

            <div className='pt-3'>
              {!managerIDs.includes(user.userInfo.id) && (
                <>
                  <Group position='left'>
                    <Link href={`/leagues/${Number(league.id)}/create`}>
                      <Button
                        className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200'
                        variant='default'
                        size='xl'
                        radius='lg'
                      >
                        Create Team
                      </Button>
                    </Link>
                    <Button
                      className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200'
                      variant='default'
                      size='xl'
                      radius='lg'
                      onClick={(evt) => onJoinTeamByTokenClick(evt)}
                    >
                      Join Team by Token
                    </Button>
                  </Group>
                </>
              )}
            </div>

            <div className='pt-5'>
              {league.teams.map((team) => {
                return (
                  <>
                    <div className='pb-5'>
                      <LeagueTeamCard team={team} league={league} />
                    </div>
                  </>
                );
              })}
            </div>

            <JoinTeamByToken
              opened={JoinTeamByTokenPopUp}
              closed={onJoinTeamByTokenClose}
              tokens={teamTokens}
            />
          </div>
        </>
      )}
    </>
  );
}
