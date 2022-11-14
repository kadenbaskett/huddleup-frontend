import React from 'react';
import './MyFriends.module.css';

const names = ['jake', 'joe', 'justin', 'kaden'];

export default function MyFriends() {
  const renderRows = () => {
    return names.map((name) => renderRow(name));
  };

  const renderRow = (name: String) => {
    return <div className='flex justify-center p-3 text-2xl '>{name}</div>;
  };

  return (
    <div className='grid grid-cols-1 bg-white rounded-xl'>
      <div className='flex huddleFont justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
        My Friends
      </div>
      {renderRows()}
    </div>
  );
}
