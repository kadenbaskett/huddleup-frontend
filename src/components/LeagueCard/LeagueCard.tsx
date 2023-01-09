import React from 'react';
import Image from 'next/image';
import NFL from '../../public/assets/NFL.png';

export interface leagueProps {
  name: string;
  subText: string;
  id: number;
}

export function LeagueCard(league: leagueProps) {
  return (
    <a href={'/leagues/' + league.id.toString() + '/home/overview'}>
      <div className='grid grid-cols-5 bg-white rounded-xl h-80 border hover:border-orange border-white'>
        <div
          className='grid col-span-1 items-center'
          style={{ width: 'auto', height: '17rem', position: 'relative' }}
        >
          <Image src={NFL} alt={league.name + '-image'} layout='fill' objectFit='contain' />
        </div>
        <div className='grid col-span-4 items-center'>
          <div className='grid grid-rows-2'>
            <div className='text-8xl font-varsity text-darkBlue'>{league.name}</div>
            <div className='text-3xl font-OpenSans text-orange'>{league.subText}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
