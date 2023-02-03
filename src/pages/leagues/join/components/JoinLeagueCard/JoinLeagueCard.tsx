import React from 'react';
import Image from 'next/image';
import NFL from '../../../../../public/assets/NFL.png';
import { Button, Grid } from '@mantine/core';
import styles from './JoinLeagueCard.module.css';
import Link from 'next/link';
import { League } from '@interfaces/league.interface';

export function JoinLeagueCard(league: League) {
  const currNumTeams = league.settings.num_teams - league.teams.length;

  // Don't display cards for public leagues that have all their teams.
  // if (currNumTeams === 0) return;
  return (
    <Link href={'/leagues/' + league.id.toString() + '/home/overview'}>
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
            {league.settings.min_players} - {league.settings.max_players} Teammates
          </Grid.Col>
          <Grid.Col span={2} className='text-2xl text-darkBlue'>
            {league.settings.scoring_settings.points_per_reception === 1 ? 'PPR' : 'NPPR'}
          </Grid.Col>
          <Grid.Col span={2} className='text-2xl text-darkBlue pt-6 pb-5 pl-5 pr-8'>
            <Grid justify='flex-end'>
              <Grid.Col>
                <Link href={`/leagues/${league.id}/join/team/create`}>
                  <Button
                    className='hover:bg-transparent hover:text-orange  text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform active:translate-y-0'
                    variant='default'
                    size='md'
                  >
                    Register
                  </Button>
                </Link>
              </Grid.Col>
              <Grid.Col className='text-2xl text-orange'>
                {currNumTeams} of {league.settings.num_teams} teams
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <div className={`${styles.descriptionDiv} text-xl text-darkBlue pl-5 pr-5`}>
          {league.description}
          <br />
        </div>
      </div>
    </Link>
  );
}
