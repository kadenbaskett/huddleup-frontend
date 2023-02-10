import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Group, Button } from '@mantine/core';
import { StoreState } from '@store/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueCard from '../../../../../components/LeagueCard/LeagueCard';
import LeagueTeamCard from '../../../../../components/LeagueTeamCard/LeagueTeamCard';

export default function index() {
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);

  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
          <div className='pt-5'>
            <LeagueCard league={league} />
          </div>

          <div className='pt-3'>
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
              <Link href={''}>
                <Button
                  className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200'
                  variant='default'
                  size='xl'
                  radius='lg'
                >
                  Join Team By Token
                </Button>
              </Link>
            </Group>
          </div>

          <div className='pt-5'>
            {league.teams.map((team) => {
              return (
                <>
                  <LeagueTeamCard team={team} league={league} />
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
