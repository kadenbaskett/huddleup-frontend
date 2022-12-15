import React from 'react';
import Image from 'next/image';
import ProfilePic from '../../public/assets/jakewhiteprofessionalpic.png';
const names = ['Jake', 'Joe', 'Justin', 'Kaden'];

export default function MyFriends() {
  const renderRows = () => {
    return names.map((name) => renderRow(name));
  };

  const renderRow = (name: string) => {
    return (
      <div className='grid grid-cols-4'>
        <Image
          className='circularImage justify-right col-span-1 align-middle'
          src={ProfilePic}
          alt={name + ' profile pic'}
          width={92}
          height={92}
        />
        <div className='justify-center col-span-3 p-3 text-4xl break-words align-middle'>
          {name}
        </div>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        My Friends
      </div>
      {renderRows()}
    </div>
  );
}
