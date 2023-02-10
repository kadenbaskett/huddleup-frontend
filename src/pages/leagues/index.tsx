import React from 'react';
import { UserLeagueCard } from './components/UserLeagueCard/UserLeagueCard';
import { HiUserGroup } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { League } from '@interfaces/league.interface';

function Leagues() {
  const userInfoFetchStatus = useSelector((state: StoreState) => state.user.status);
  const userLeagues = useSelector((state: StoreState) => state.user.leagues);

  const renderLeague = (league: League) => {
    return (
      <div className='grid col-span-10'>
        <UserLeagueCard league={league} />
      </div>
    );
  };

  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <div className='grid grid-cols-10 bg-lightGrey p-10 min-h-screen gap-3 flex items-start'>
          <div className='col-span-4'>
            <Group>
              <Link href={'/leagues/join'}>
                <Button
                  leftIcon={<HiUserGroup />}
                  className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  size='xl'
                >
                  Join a league
                </Button>
              </Link>

              <Link href={'/leagues/create'}>
                <Button
                  leftIcon={<BsPlusLg />}
                  className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  size='xl'
                >
                  Create a League
                </Button>
              </Link>
            </Group>
          </div>
          {userLeagues.map((league) => renderLeague(league))}
        </div>
      )}
      ;
    </>
  );
}

export default Leagues;
