import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import JoinTeamByToken from '@components/JoinTeamByToken/JoinTeamByToken';
import { Group, Button } from '@mantine/core';
import { StoreState } from '@store/store';
import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LeagueCard from '../../../../../components/LeagueCard/LeagueCard';
import LeagueTeamCard from '../../../../../components/LeagueTeamCard/LeagueTeamCard';

export default function index() {
  const user = useSelector((state: StoreState) => state.user);
  const userInfoFetchStatus: String = useSelector((state: StoreState) => state.user.status);
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const [JoinTeamByTokenPopUp, setJoinTeamByTokenPopUp] = useState(false);

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
