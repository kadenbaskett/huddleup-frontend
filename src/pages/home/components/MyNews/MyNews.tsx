import React, { useState } from 'react';
// import Image from 'next/image';
import { News } from '@interfaces/news.interface';
// import CNN from '../../../../public/assets/CNNPhoto.png';

function capitalizeFirstLetter(str) {
  const upperFirstLetter: string = str.charAt(0).toUpperCase();
  const remainingString: string = str.slice(1);
  return upperFirstLetter + remainingString;
}

const renderRow = (news: News) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='p-4 pb-2 border-darkBlue border-4 border-t-0'>
      {/* <Image
        className='justify-right col-span-1 align-middle'
        src={CNN}
        alt='some news photo pic'
        width={92}
        height={92}
      /> */}
      <a
        target='_blank'
        href={news.source_url}
        className='underline text-blue-600 hover:text-blue-800 justify-left text-2xl break-words align-middle'
        rel='noreferrer'
      >
        {news.title}
      </a>
      {isExpanded && <p className='mt-3'>{news.content} </p>}
      {!isExpanded && <p className='mt-3'>{news.content.slice(0, 200)}... </p>}
      {!isExpanded && (
        <div className='text-sm text-right'>
          <button className='text-blue-500 hover:text-blue-700' onClick={() => setIsExpanded(true)}>
            Show more
          </button>
        </div>
      )}
      {isExpanded && (
        <div className='text-sm text-right'>
          <button
            className='text-blue-500 hover:text-blue-700'
            onClick={() => setIsExpanded(false)}
          >
            Show less
          </button>
        </div>
      )}
      <div className='flex items-center text-sm text-gray-700'>
        <div>Time posted: {capitalizeFirstLetter(news.time_posted)}</div>
        <div className='ml-4'>Source: {news.source}</div>
      </div>
    </div>
  );
};

export interface MyNewsProps {
  news: News[];
}

export default function MyNews(props: MyNewsProps) {
  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        News
      </div>
      {props.news.map((article) => renderRow(article))}
    </div>
  );
}
