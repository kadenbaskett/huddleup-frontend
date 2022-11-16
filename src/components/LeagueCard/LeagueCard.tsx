import React from 'react';
import Image from 'next/image';
import NFL from '../../public/assets/NFL.png';

export interface leagueCardProps {
  name: string;
  subText: string;
}

export function LeagueCard(leagueCard: leagueCardProps) {
  return (
    <a href=''>
      <div className='grid grid-cols-5 bg-white rounded-xl h-80 border hover:border-orange border-white'>
        <div
          className='grid col-span-1 items-center'
          style={{width: 'auto', height: '17rem', position: 'relative'}}
        >
          <Image src={NFL} alt={leagueCard.name + '-image'} layout='fill' objectFit='contain' />
        </div>
        <div className='grid col-span-4  items-center'>
          <div className='grid grid-rows-2'>
            <div className='text-8xl font-varsity text-darkBlue'>{leagueCard.name}</div>
            <div className='text-3xl font-OpenSans text-orange'>{leagueCard.subText}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
