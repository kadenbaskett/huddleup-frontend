import React from 'react';
import Image from 'next/image';
import NFL from '../../../../../public/assets/NFL.png';
import { Button, Grid } from '@mantine/core';
import styles from './JoinLeagueCard.module.css';
import Link from 'next/link';
import { League } from '@interfaces/league.interface';

export interface JoinLeagueCardProps {
  league: League;
  userId: number;
}

export function JoinLeagueCard(props: JoinLeagueCardProps) {
  return (
    <Link href={'/leagues/' + props.league.id.toString() + '/home/overview'}>
      <div
        id={styles.card}
        // eslint-disable-next-line no-template-curly-in-string
        className='bg-white rounded-xl border border-white h-[7rem] transition-all ease-in duration-200 hover:h-[11rem] hover:border-orange'
      >
        <Grid grow align='center' justify='flex-start' className='pl-5'>
          <Grid.Col span={1}>
            <Image src={NFL} alt={props.league.name + '-image'} height={45} width={45} />
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
              <Grid.Col>
                <Link href={`/leagues/${props.league.id}/join/${props.league.token}`}>
                  <Button
                    className='hover:bg-transparent hover:text-orange  text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform active:translate-y-0'
                    variant='default'
                    size='md'
                    radius='lg'
                  >
                    Register
                  </Button>
                </Link>
              </Grid.Col>
              <Grid.Col className='text-2xl text-orange'>
                {props.league.teams.length} of {props.league.settings.num_teams} teams
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <div className={`${styles.descriptionDiv} text-xl text-darkBlue pl-5 pr-5`}>
          {props.league.description}
          <br />
        </div>
      </div>
    </Link>
  );
}
