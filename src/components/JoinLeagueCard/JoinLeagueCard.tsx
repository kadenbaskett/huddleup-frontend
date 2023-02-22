import React from 'react';
import Image from 'next/image';
import NFL from '@public/assets/NFL.png';
import { Button, Grid } from '@mantine/core';
import styles from './JoinLeagueCard.module.css';
import Link from 'next/link';
import { League } from '@interfaces/league.interface';
import { useWindowResize } from '@services/helpers';

export interface JoinLeagueCardProps {
  league: League;
  userId: number;
}

export function JoinLeagueCard(props: JoinLeagueCardProps) {
  const windowSize: number[] = useWindowResize();

  let leagueNameSpan = 0;
  let numPlayerSpan = 0;
  let scoringTypeSpan = 0;
  let registerButtonSpan = 0;
  let imageSpan = 0;
  let height = '';
  let hoverHeight = '';

  if (windowSize[0] > 805 || windowSize[0] === 0) {
    height = '7rem';
    hoverHeight = '11rem';
    leagueNameSpan = 6;
    numPlayerSpan = 5;
    scoringTypeSpan = 3;
    registerButtonSpan = 5;
    imageSpan = 1;
  } else {
    height = '22rem';
    hoverHeight = '25rem';
    leagueNameSpan = 20;
    numPlayerSpan = 20;
    scoringTypeSpan = 20;
    registerButtonSpan = 20;
    imageSpan = 20;
  }

  return (
    <Link href={'/leagues/' + props.league.id.toString() + '/home/overview'}>
      <div
        id={styles.card}
        className={`bg-white rounded-xl border border-white h-[${height}] transition-all ease-in duration-200 hover:h-[${hoverHeight}] hover:border-orange`}
      >
        <Grid columns={20} align='center' className='pl-5'>
          <Grid.Col span={imageSpan}>
            <Image src={NFL} alt={props.league.name + '-image'} height={45} width={45} />
          </Grid.Col>

          <Grid.Col
            span={leagueNameSpan}
            className='text-4xl font-varsity text-darkBlue pt-1 overflow-hidden'
          >
            {props.league.name.length > 15
              ? props.league.name.substring(0, 15) + '...'
              : props.league.name}
          </Grid.Col>
          <Grid.Col span={numPlayerSpan} className='text-2xl text-darkBlue'>
            {props.league.settings.min_players} - {props.league.settings.max_players} Teammates
          </Grid.Col>
          <Grid.Col span={scoringTypeSpan} className='text-2xl text-darkBlue'>
            {props.league.settings.scoring_settings.points_per_reception === 1 ? 'PPR' : 'NPPR'}
          </Grid.Col>
          <Grid.Col
            span={registerButtonSpan}
            className='text-2xl text-darkBlue pt-6 pb-5 pl-5 pr-8'
          >
            <Grid justify='flex-end'>
              <Grid.Col>
                <Link href={`/leagues/${props.league.id}/join/${props.league.token}`}>
                  <Button
                    className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform active:translate-y-0'
                    variant='default'
                    size='md'
                    radius='lg'
                  >
                    Register
                  </Button>
                </Link>
              </Grid.Col>
              <Grid.Col className='text-xl text-orange'>
                {props.league.teams.length} of {props.league.settings.num_teams} teams
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={20}>
            <div className={`${styles.descriptionDiv} text-xl text-darkBlue pl-5 pr-5`}>
              {props.league.description}
              <br />
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </Link>
  );
}
