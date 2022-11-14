import React from 'react';
import Image from 'next/image';
import TeamProfilePic from '../../public/assets/huddle-up-logo.png';

interface team {
  team: string;
  league: string;
}

const teams: team[] = [
  {team: 'gay team 1', league: 'league 1'},
  {team: 'gay team 2', league: 'league 2'},
  {team: 'gay team 3', league: 'league 3'},
  {team: 'gay team 4', league: 'league 4'},
];

export default function MyTeams() {
  const renderRows = () => {
    return teams.map((team) => renderRow(team));
  };

  const renderRow = (team: team) => {
    return (
      <div className='grid grid-cols-4 p-3'>
        <Image
          className='circularImage justify-right col-span-1 align-middle'
          src={TeamProfilePic}
          alt={team.team + ' profile pic'}
          width={92}
          height={92}
        />
        <div className='justify-center col-span-3 text-2xl break-words align-middle'>
          {team.team}
          <div className='justify-right col-span-3 text-lg text-orange break-words align-middle'>
            {team.league}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex huddleFont justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        My Teams
      </div>
      {renderRows()}
    </div>
  );
}
