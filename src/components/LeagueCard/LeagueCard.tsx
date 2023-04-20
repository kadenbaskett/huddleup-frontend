import { League } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import React from 'react';
import { getLeagueIcon, useWindowResize } from '@services/helpers';

export interface LeagueCardProps {
  league: League;
}

export default function LeagueCard(props: LeagueCardProps) {
  const windowSize = useWindowResize();
  return (
    <>
      <div className='bg-white rounded-xl border border-white p-2 transition-all ease-in duration-200 hover:drop-shadow'>
        <Grid grow align='center' justify='start' className='pt-5 pl-5'>
          <Grid.Col span={8}>
            <div className='flex'>
              <div className='pl-2 pr-5'>{getLeagueIcon(props.league.name, windowSize[0])}</div>
              <div>
                <div className='lg:text-5xl sm:text-3xl font-varsity text-darkBlue pt-1'>
                  {props.league.name}
                </div>
                <div className='text-xl text-orange'>
                  {props.league.settings.min_players} - {props.league.settings.max_players}{' '}
                  Teammates
                  <div>
                    {props.league.settings.scoring_settings.points_per_reception === 1
                      ? 'Scoring: PPR'
                      : 'Scoring: NPPR'}
                  </div>
                </div>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={2} className='text-2xl text-darkBlue pt-6 pb-5 pl-5 pr-8'>
            <div className='grid place-items-end'>
              <div className='grid place-items-center'>
                <div className='text-5xl font-varsity text-darkBlue'>
                  {props.league.teams.length}/{props.league.settings.num_teams}
                </div>
                <div className='text-xl font-varsity text-darkBlue'>teams</div>
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
