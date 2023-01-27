import React from 'react';
import Image from 'next/image';
import TeamProfilePic from '../../../../public/assets/huddle-up-logo.png';
import { League, Team } from '@interfaces/league.interface';

const renderRow = (props: RowProps) => {
  return (
    <div className='grid grid-cols-4 p-3'>
      <Image
        className='circularImage justify-right col-span-1 align-middle'
        src={TeamProfilePic}
        alt={props.team.name + ' profile pic'}
        width={92}
        height={92}
      />
      <div className='justify-center col-span-3 text-2xl break-words align-middle'>
        {props.team.name}
        <div className='justify-right col-span-3 text-lg text-orange break-words align-middle'>
          {props.leagueName}
        </div>
      </div>
    </div>
  );
};

export interface MyTeamsProps {
  leagues: League[];
}

export interface RowProps {
  team: Team;
  leagueName: string;
}
export default function MyTeams(props: MyTeamsProps) {
  const userTeams: RowProps[] = [];
  // props.leagues.forEach((league) =>
  //   league.teams.forEach((Team: Team) => {
  //     const row: RowProps = [{ team: Team }, { leagueName: league.name }];
  //     userTeams.push(row);
  //   }),
  // );
  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        My Teams
      </div>
      {userTeams.map((team) => renderRow(team))}
    </div>
  );
}
