import React from 'react';
import Link from 'next/link';
import { League, Team } from '@interfaces/league.interface';
import { getLeagueIcon, useWindowResize } from '@services/helpers';

export interface UserLeagueCardProps {
  league: League;
  userTeam: Team;
}

export function UserLeagueCard(props: UserLeagueCardProps) {
  const windowSize = useWindowResize();
  const link =
    props.league.settings.roster_settings.roster_size_limit !==
    props.userTeam.rosters[0]?.players.length
      ? `/leagues/${Number(props.league.id)}/join/${props.league.token}`
      : `/leagues/${Number(props.league.id)}/team/${props.userTeam?.id}`;
  // const color = getColor(props.league.name);
  return (
    <Link href={link}>
      <div className='flex bg-white rounded-xl border-4 border-solid hover:border-darkBlue border-white p-5'>
        <div className='items-center'>{getLeagueIcon(props.league.name, windowSize[0])}</div>
        <div className=' items-center'>
          <div className=''>
            <div className='lg:text-5xl md:text-3xl sm:text-3xl font-varsity color-darkBlue'>
              {props.league.name}
            </div>
            <div className='lg:text-xl md:text-lg sm:text-md font-OpenSans text-darkBlue'>
              {props.league.description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
