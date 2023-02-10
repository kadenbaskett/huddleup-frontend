import { League, Team } from '@interfaces/league.interface';
import React from 'react';
import Image from 'next/image';
import NFL from '../../../../../../../public/assets/NFL.png';
import { Grid } from '@mantine/core';
import { createManagerString } from '@services/helpers';

export interface TeamCardProps {
  team: Team;
  league: League;
}

export default function TeamCard(props: TeamCardProps) {
  const color = props.team.managers.length >= props.league.settings.min_players ? 'green' : 'red';
  return (
    <>
      <div className='bg-white rounded-xl border border-white h-[7rem] transition-all ease-in duration-200 hover:drop-shadow'>
        <Grid grow align='flex-start' justify='flex-start' className='pl-5'>
          <Grid.Col className='pt-7' span={1}>
            <Image src={NFL} alt={props.team.name + '-image'} height={45} width={45} />
          </Grid.Col>
          <Grid.Col span={4}>
            <div className='text-5xl font-varsity text-orange'>{props.team.name}</div>
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
