import React from 'react';
import Image from 'next/image';
import CNN from '../../../../public/assets/CNNPhoto.png';
import { News } from '@pages/home/types';

export interface MyNewsProps {
  news: News[];
}

const renderRow = (mynews: News) => {
  return (
    <div className='grid grid-cols-8 p-3'>
      <Image
        className='justify-right col-span-1 align-middle'
        src={CNN}
        alt='some news photo pic'
        width={92}
        height={92}
      />
      <p className='justify-left col-span-7 text-2xl break-words align-middle'>{mynews.news}</p>
    </div>
  );
};

export default function MyNews(props: MyNewsProps) {
  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        News
      </div>
      {props.news.map((news: News) => renderRow(news))}
    </div>
  );
}
