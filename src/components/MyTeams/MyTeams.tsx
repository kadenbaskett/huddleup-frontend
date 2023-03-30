import React from 'react';
import Image from 'next/image';
import TeamProfilePic from '../../public/assets/huddle-up-logo.png';
import { Team, League } from '@interfaces/league.interface';
import Link from 'next/link';

const renderRow = (team: Team, leagues: League[]) => {
  const userLeague: League = leagues.find((league) => league.id === team.league.id);

  const activeLeague =
    userLeague.settings.roster_settings.roster_size_limit !== team.rosters[0]?.players.length;

  const leagueLink = activeLeague
    ? `/leagues/${Number(team.league.id)}/join/${team.league.token}`
    : '/leagues/' + team.league.id.toString() + '/home/overview';

  const teamLink = activeLeague
    ? '/leagues/' + team.league.id.toString() + '/create/' + team.token.toString()
    : '/leagues/' + team.league.id.toString() + '/team/' + team.id.toString();

  return (
    <>
      <div className='inline-flex'>
        <div>
          <Image
            className='circularImage justify-right col-span-1 align-middle'
            src={TeamProfilePic}
            alt={team.name + ' profile pic'}
            width={92}
            height={92}
          />
        </div>
        <Link
          href={teamLink}
          className='justify-left col-span-3 text-2xl break-words align-middle pl-3'
        >
          {team.name}
          <br />
          <Link
            href={leagueLink}
            className='justify-left col-span-3 text-lg text-orange break-words align-middle pl-1'
          >
            {team.league.name}
          </Link>
        </Link>
      </div>
    </>
  );
};

export interface MyTeamsProps {
  teams: Team[];
  leagues: League[];
}

export default function MyTeams(props: MyTeamsProps) {
  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        My Teams
      </div>
      {props.teams.map((team) => renderRow(team, props.leagues))}
    </div>
  );
}
