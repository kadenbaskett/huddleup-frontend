import { League, Team } from '@interfaces/league.interface';
import React from 'react';
import { Button, Grid } from '@mantine/core';
import { createManagerString } from '@services/helpers';
import Link from 'next/link';
import { userSliceState } from '@store/slices/userSlice';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';
import { GiAmericanFootballHelmet } from 'react-icons/gi';

export interface LeagueTeamCardProps {
  team: Team;
  league: League;
}

const onTeam = (user, managerIDs: number[]) => {
  return managerIDs.includes(user.userInfo.id);
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
  props.team.managers.forEach((manager) => {
    managerIDs.push(manager.user_id);
  });

  return (
    <>
      <div className='bg-white rounded-xl border border-white p-2 transition-all ease-in duration-200 hover:drop-shadow'>
        <Grid grow align='flex-start' justify='flex-start' className='pl-5'>
          <Grid.Col className='pt-7' span={5}>
            <div className='flex'>
              <div className='pl-2 pr-5'>
                <GiAmericanFootballHelmet size={75} />
              </div>
              <div>
                <div className='lg:text-3xl sm:text-xl font-varsity text-darkBlue inline-block'>
                  {props.team.name}{' '}
                </div>
                <div className='lg:text-xl sm:text-md font-OpenSans font-bold text-darkBlue'>
                  Team Members:
                </div>
                <div className='lg:text-md sm:text-sm font-OpenSans font-bold text-darkBlue'>
                  {createManagerString(props.team.managers)}
                </div>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={3} className='text-2xl text-darkBlue pt-6 pb-5 pl-5 pr-8'>
            <Grid justify='flex-end'>
              <div className='flex'>
                <div className='text-5xl font-varsity text-orange inline-block'></div>
                <div className='grid place-item-end'>
                  <div className='grid place-items-center'>
                    <div className={`text-5xl font-varsity text-${color} `}>
                      {props.team.managers.length}/{props.league.settings.max_players}
                    </div>
                    <div className={`text-xl font-varsity inline-flex text-${color} text-center`}>
                      Spots Filled
                    </div>
                    {onTeam(user, managerIDs) ? viewTeamButton(props.league, props.team) : ''}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
