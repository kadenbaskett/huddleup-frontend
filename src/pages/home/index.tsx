import React from 'react';
import MyFriends from '../../components/MyFriends/MyFriends';
import MyNews from '../../components/MyNews/MyNews';
import MyTeams from '../../components/MyTeams/MyTeams';

export default function Home(props: any) {
  return (
    <div className='grid grid-cols-10 gap-6 bg-slate-300 p-10 min-h-screen'>
      <div className='col-span-3'>
        <div>
          <MyTeams />
        </div>
        <div className='pt-5'>
          <MyFriends />
        </div>
      </div>
      <div className='col-span-7'>
        <MyNews />
      </div>
    </div>
  );
}
