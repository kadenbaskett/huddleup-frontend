import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { LeagueCard, leagueProps } from '@components/LeagueCard/LeagueCard';
import { HiUserGroup } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import { AppDispatch, StoreState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicLeaguesThunk } from '@store/slices/globalSlice';

function leagues() {
  const dispatch = useDispatch<AppDispatch>();
  // const userLeaguesFetchStatus = useSelector((state: StoreState) => state.user.status);
  const globalFetchStatus = useSelector((state: StoreState) => state.global.status);
  const publicLeagues = useSelector((state: StoreState) => state.global.publicLeagues);

  useEffect(() => {
    if (globalFetchStatus === 'idle') {
      dispatch(fetchPublicLeaguesThunk());
    }
  }, [globalFetchStatus, dispatch]);

  const leagueData = publicLeagues.map((league) => {
    const l: leagueProps = {
      name: league.name,
      id: league.id,
      subText: 'This is an example league description',
    };
    return l;
  });

  const renderLeagues = () => {
    return leagueData.map((league: leagueProps) => renderLeague(league));
  };

  const renderLeague = (league: leagueProps) => {
    return (
      <div key={league.id} className='grid col-span-10'>
        <LeagueCard {...league} />
      </div>
    );
  };

  return (
    <div className='grid grid-cols-10 bg-slate-300 p-10 min-h-screen gap-3 flex items-start'>
      <div className='col-span-4'>
        <Group>
          <Button
            leftIcon={<HiUserGroup />}
            className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
            variant='default'
            size='xl'
          >
            Join a league
          </Button>
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
      {renderLeagues()}
    </div>
  );
}

export default leagues;
