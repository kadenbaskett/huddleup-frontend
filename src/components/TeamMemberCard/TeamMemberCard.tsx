import { Button, Grid } from '@mantine/core';
import { removeUserFromTeam } from '@services/apiClient';
import { StoreState } from '@store/store';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import NFL from '../../public/assets/NFL.png';

export interface TeamMemberCardProps {
  manager: any;
  isCaptain: boolean;
  team: any;
}

export default function TeamMemberCard(props: TeamMemberCardProps) {
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(async () => {
    const userToRemove = {
      user: props.manager,
      userTeam,
    };
    await removeUserFromTeam(userToRemove);
  });

  const showRemove = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <Button
            className={`${'bg-transparent hover:bg-red text-red hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
            variant='default'
            size='sm'
            formMethod='POST'
            type='submit'
          >
            Remove
          </Button>
        </form>
      </>
    );
  };

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
