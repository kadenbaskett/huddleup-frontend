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
  if (props.page === 'overview') {
    return (
      <div className='pt-5 pb-5'>
        <div className='grid grid-cols-1 bg-white rounded-xl hover:drop-shadow-md'>
          <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
            League Information
          </div>
          <div className='font-bold text-lg text-darkBlue p-2'>{props.leagueDescription}</div>
          <div className='p-2'>
            <Group position='left'>
              <Link href={'/leagues/' + props.leagueId.toString() + '/home/teams'}>
                <Button
                  className={`${'bg-transparent hover:bg-green text-green hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-green rounded border-green transition ease-in duration-200`}
                  variant='default'
                  size='sm'
                >
                  Teams
                </Button>
              </Link>
              <Link href={'/leagues/' + props.leagueId.toString() + '/home/settings'}>
                <Button
                  className={`${'bg-transparent hover:bg-orange text-orange hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-orange rounded border-orange transition ease-in duration-200`}
                  variant='default'
                  size='sm'
                >
                  Settings
                </Button>
              </Link>
            </Group>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='bg-lightGrey pt-3 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40'>
        <Link href={'/leagues/' + props.leagueId.toString() + '/home/overview'}>
          <Button
            className={`${'bg-transparent hover:bg-orange text-orange hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-orange rounded border-orange transition ease-in duration-200`}
            variant='default'
            size='sm'
          >
            Back to overview
          </Button>
        </Link>
      </div>
    );
  }
}
