import React from 'react';
import Image from 'next/image';
import NFL from '../../public/assets/NFL.png';
import Link from 'next/link';
import { League } from '@interfaces/league.interface';

export interface UserLeagueCardProps {
  league: League;
}

export function UserLeagueCard(props: UserLeagueCardProps) {
  const link =
    props.league.teams.length < 8
      ? `/leagues/${Number(props.league.id)}/join/${props.league.token}`
      : `/leagues/${Number(props.league.id)}/home/overview`;
  return (
    <Link href={link}>
      <div className='grid grid-cols-5 bg-white rounded-xl h-80 border hover:border-orange border-white'>
        <div
          className='grid col-span-1 items-center'
          style={{ width: 'auto', height: '17rem', position: 'relative' }}
        >
          <Image src={NFL} alt={props.league.name + '-image'} />
        </div>
        <div className='grid col-span-4 items-center'>
          <div className='grid grid-rows-2'>
            <div className='text-8xl font-varsity text-darkBlue'>{props.league.name}</div>
            <div className='text-3xl font-OpenSans text-orange'>{props.league.description}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
