import { League } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import NFL from '../../../../../../../public/assets/NFL.png';

export interface LeagueCardProps {
  league: League;
}

export default function LeagueCard(props: LeagueCardProps) {
  console.log('league', props.league);
  return (
    <div className='bg-white rounded-xl border border-white h-[10rem] transition-all ease-in duration-200 hover:drop-shadow'>
      <Grid grow align='center' justify='center' className='pt-5 pl-5'>
        <Grid.Col span={1}>
          <Image src={NFL} alt={props.league.name + '-image'} height={80} width={80} />
        </Grid.Col>
        <Grid.Col span={4} className='text-5xl font-varsity text-darkBlue pt-1'>
          {props.league.name}
        </Grid.Col>
        <Grid.Col span={2} className='text-2xl text-darkBlue'>
          {props.league.settings.min_players} - {props.league.settings.max_players} Teammates
        </Grid.Col>
        <Grid.Col span={2} className='text-2xl text-darkBlue'>
          {props.league.settings.scoring_settings.points_per_reception === 1 ? 'PPR' : 'NPPR'}
        </Grid.Col>
        <Grid.Col span={2} className='text-2xl text-darkBlue pt-6 pb-5 pl-5 pr-8'>
          <Grid justify='flex-end'>
            <Grid.Col span='content'>
              <div className='grid place-items-center'>
                <div className='text-5xl font-varsity text-darkBlue '>
                  {props.league.teams.length}/{props.league.settings.num_teams}
                </div>
                <div className='text-xl font-varsity text-darkBlue'>teams</div>
              </div>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </div>
  );
}
