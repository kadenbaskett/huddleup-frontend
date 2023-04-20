import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import React from 'react';

export interface DraftNotificationCardProps {
  league: any;
}

export default function DraftNotificationCard(props: DraftNotificationCardProps) {
  const router = useRouter();

  const goToDraft = async () => {
    await router.push({
      pathname: `/leagues/${Number(props.league.id)}/draft`,
    });
  };

  return (
    <>
      {
        <div className='bg-white rounded-xl hover:drop-shadow-md border border-orange border-4'>
          <div className='grid place-items-center p-4'>
            <div className='text-4xl font-varsity text-darkBlue pt-5 pl-10 pr-10 inline-block '>
              The draft for {props.league.name} has started. Join now!
            </div>
          </div>
          <div className='grid place-items-center p-4'>
            <Button
              className='hover:bg-transparent hover:text-orange text-xl hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='lg'
              onClick={async () => await goToDraft()}
            >
              Join Draft
            </Button>
          </div>
        </div>
      }
    </>
  );
}
