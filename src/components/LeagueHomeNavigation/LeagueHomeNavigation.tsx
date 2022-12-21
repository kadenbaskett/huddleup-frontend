import { Button, Group } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

export interface leagueHomeNavigationProps {
  leagueName: string;
  leagueId: Number;
  leagueDescription: string;
  page: string;
}

export default function LeagueHomeNavigation(props: leagueHomeNavigationProps) {
  return (
    <div>
      <div className='grid grid-cols-1 bg-white rounded-xl'>
        <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
          League Information
        </div>
        <div className='font-bold text-lg text-darkBlue'>{props.leagueDescription}</div>
        <Group position='left'>
          <Link href={'/leagues/' + props.leagueId.toString() + '/home/overview'}>
            <Button
              className={`${
                props.page === 'overview'
                  ? 'bg-red hover:bg-transparent text-white hover:text-red'
                  : 'bg-transparent hover:bg-red text-red hover:text-white'
              } hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
              variant='default'
              size='sm'
            >
              Overview
            </Button>
          </Link>
          <Link href={'/leagues/' + props.leagueId.toString() + '/home/teams'}>
            <Button
              className={`${
                props.page === 'teams'
                  ? 'bg-green hover:bg-transparent text-white hover:text-green'
                  : 'bg-transparent hover:bg-green text-green hover:text-white'
              } hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-green rounded border-green transition ease-in duration-200`}
              variant='default'
              size='sm'
            >
              Teams
            </Button>
          </Link>
          <Link href={'/leagues/' + props.leagueId.toString() + '/home/settings'}>
            <Button
              className={`${
                props.page === 'settings'
                  ? 'bg-orange hover:bg-transparent text-white hover:text-orange'
                  : 'bg-transparent hover:bg-orange text-orange hover:text-white'
              } hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-orange rounded border-orange transition ease-in duration-200`}
              variant='default'
              size='sm'
            >
              Settings
            </Button>
          </Link>
        </Group>
      </div>
    </div>
  );
}
