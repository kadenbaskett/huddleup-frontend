import React from 'react';
import Image from 'next/image';
import NFL from '../../public/assets/NFL.png';
import { Button, Grid } from '@mantine/core';
import styles from './JoinLeagueCard.module.css';

export interface joinleagueProps {
  name: string;
  subText: string;
  id: number;
  numMinPlayers: number;
  numMaxPlayers: number;
  scoring: string;
  totalTeams: number;
  numTeams: number;
}

export function JoinLeagueCard(league: joinleagueProps) {
  return (
    <a href={'/leagues/' + league.id.toString() + '/home'}>
      <div
        id={styles.card}
        // eslint-disable-next-line no-template-curly-in-string
        className='bg-white rounded-xl border border-white h-[7rem] transition-all ease-in duration-200 hover:h-[11rem] hover:border-orange'
      >
        <Grid grow align='center' justify='flex-start' className='pl-5'>
          <Grid.Col span={1}>
            <Image src={NFL} alt={league.name + '-image'} height={55} width={55} />
          </Grid.Col>

          <Grid.Col span={4} className='text-5xl font-varsity text-darkBlue pt-1'>
            {league.name}
          </Grid.Col>
          <Grid.Col span={2} className='text-2xl text-darkBlue'>
            {league.numMinPlayers} - {league.numMaxPlayers} Teammates
          </Grid.Col>
          <Grid.Col span={2} className='text-2xl text-darkBlue'>
            {league.scoring}
          </Grid.Col>

          <Grid.Col span={2} className='text-2xl text-darkBlue pt-6 pb-5 pl-5 pr-8'>
            <Grid justify='flex-end'>
              <Grid.Col>
                <Button
                  className='hover:bg-transparent hover:text-orange  text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform active:translate-y-0'
                  variant='default'
                  size='md'
                  type='submit'
                >
                  Register
                </Button>
              </Grid.Col>
              <Grid.Col className='text-2xl text-orange'>
                {league.numTeams} of {league.totalTeams} teams
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <div className={`${styles.descriptionDiv} text-xl text-darkBlue pl-5 pr-5`}>
          {league.subText}
          <br />
        </div>
      </div>
    </a>
  );
}
