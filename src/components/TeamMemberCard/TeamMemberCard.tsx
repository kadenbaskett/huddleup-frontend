import { Button, Grid } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import NFL from '../../../../../../public/assets/NFL.png';

export interface TeamMemberCardProps {
  manager: any;
  isCaptain: boolean;
}

const showRemove = () => {
  return (
    <>
      <Button
        className={`${'bg-transparent hover:bg-red text-red hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
        variant='default'
        size='sm'
      >
        Remove
      </Button>
    </>
  );
};

export default function TeamMemberCard(props: TeamMemberCardProps) {
  return (
    <>
      <div className='bg-white rounded-xl border border-white h-[4.5rem] transition-all ease-in duration-100 hover:drop-shadow-md'>
        <Grid columns={20} justify='flex-start' align='center' className='pl-5 pt-1'>
          <Grid.Col span={1}>
            <Image src={NFL} height={55} width={55} alt={'image'} />
          </Grid.Col>
          <Grid.Col span={16}>
            <div className='text-5xl font-varsity text-darkBlue'>{props.manager.user.username}</div>
          </Grid.Col>
          <Grid.Col span={1}>
            {props.isCaptain && !props.manager.is_captain ? showRemove() : ''}
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
