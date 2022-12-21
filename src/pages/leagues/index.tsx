import React from 'react';
import { LeagueCard, leagueProps } from '../../components/LeagueCard/LeagueCard';
import { HiUserGroup } from 'react-icons/hi';
import { BsPlusLg } from 'react-icons/bs';
import { Button, Group } from '@mantine/core';
import Link from 'next/link';

const leagueData: leagueProps[] = [
  {
    name: 'League 1',
    subText: 'This is an example league description',
    id: '1',
  },
  {
    name: 'League 2',
    subText:
      'This is an example long league description that could potentially be too big but its not a big deal because the text should rap, wait I mean it should wrap, the text isnt Drake',
    id: '2',
  },
];

const renderLeagues = () => {
  return leagueData.map((league) => renderLeague(league));
};

const renderLeague = (league: leagueProps) => {
  return (
    <div className='grid col-span-10'>
      <LeagueCard {...league} />
    </div>
  );
};

function leagues() {
  return (
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
      {renderLeagues()}
    </div>
  );
}

export default leagues;
