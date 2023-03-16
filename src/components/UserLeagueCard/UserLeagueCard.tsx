import React from 'react';
import Image from 'next/image';
import NFL from '../../public/assets/NFL.png';
import Link from 'next/link';
import { League, Team } from '@interfaces/league.interface';

export interface UserLeagueCardProps {
  league: League;
  userTeam: Team;
}

export function UserLeagueCard(props: UserLeagueCardProps) {
  const link =
    props.league.teams.length < 8
      ? `/leagues/${Number(props.league.id)}/join/${props.league.token}`
      : `/leagues/${Number(props.league.id)}/team/${props.userTeam?.id}`;
  return (
    <Link href={link}>
      <div className='grid grid-cols-5 bg-white rounded-xl border hover:border-orange border-white'>
        <div className='grid col-span-1 items-center'>
          <Image src={NFL} alt={props.league.name + '-image'} width={225} height={225} />
        </div>
        <div className='grid col-span-4 items-center'>
          <div className='grid grid-rows-2'>
            <div className='lg:text-8xl md:text-5xl sm:text-3xl font-varsity text-darkBlue'>
              {props.league.name}
            </div>
            <div className='lg:text-3xl md:text-xl sm:text-md font-OpenSans text-orange'>
              {props.league.description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
