import { League, Team } from '@interfaces/league.interface';
import React from 'react';
import Image from 'next/image';
import NFL from '../../public/assets/NFL.png';
import { Button, Grid } from '@mantine/core';
import { createManagerString } from '@services/helpers';
import Link from 'next/link';
import { userSliceState } from '@store/slices/userSlice';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';

export interface LeagueTeamCardProps {
  team: Team;
  league: League;
}

const onTeam = (user, managerIDs: number[]) => {
  return !managerIDs.includes(user.id);
};

const viewTeamButton = (league: League, team: Team) => {
  return (
    <>
      <Link href={`/leagues/${league.id}/create/${team.token}`}>
        <Button
          className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
          variant='default'
          size='sm'
          radius='md'
        >
          View Team
        </Button>
      </Link>
    </>
  );
};

export default function LeagueTeamCard(props: LeagueTeamCardProps) {
  const user: userSliceState = useSelector((state: StoreState) => state.user);
  const color = props.team.managers.length >= props.league.settings.min_players ? 'green' : 'red';
  const managerIDs: number[] = [];
  console.log('props.team.mangers', props.team.managers);
  props.team.managers.forEach((manager) => {
    managerIDs.push(manager.id);
  });
  return (
    <>
      <div className='bg-white rounded-xl border border-white h-[7rem] transition-all ease-in duration-200 hover:drop-shadow'>
        <Grid columns={24} grow align='flex-start' justify='flex-start' className='pl-5'>
          <Grid.Col className='pt-7' span={1}>
            <Image src={NFL} alt={props.team.name + '-image'} height={45} width={45} />
          </Grid.Col>
          <Grid.Col span={14}>
            <div className='text-5xl font-varsity text-orange inline-block'>
              {props.team.name}{' '}
              {onTeam(user, managerIDs) ? viewTeamButton(props.league, props.team) : ''}
            </div>
            <div className='text-xl font-OpenSans font-bold text-darkBlue'>Team Members:</div>
            <div className='font-OpenSans font-bold text-darkBlue'>
              {createManagerString(props.team.managers)}
            </div>
          </Grid.Col>
          <Grid.Col span={7} className='text-2xl text-darkBlue pt-6 pb-5 pl-5 pr-8'>
            <Grid justify='flex-end'>
              <Grid.Col span='content'>
                <div className='grid place-items-center'>
                  <div className={`text-5xl font-varsity text-${color}`}>
                    {props.team.managers.length}/{props.league.settings.max_players}
                  </div>
                  <div className={`text-xl font-varsity inline-flex text-${color}`}>
                    Spots Filled
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
