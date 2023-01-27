import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import MyFriends from './components/MyFriends/MyFriends';
import MyNews from './components/MyNews/MyNews';
import MyTeams from './components/MyTeams/MyTeams';
import { Friend, News } from './types';

const friendData: Friend[] = [
  {
    name: 'Joe',
    id: 1,
  },
  {
    name: 'Jake',
    id: 2,
  },
  {
    name: 'Kaden',
    id: 3,
  },
];

const mynews: News[] = [
  { news: 'This wil be news about something' },
  { news: 'This should be some other news about a player or something along those lines.' },
  {
    news: 'Some more relevant news.',
  },
  {
    news: 'Finally more news',
  },
];

export default function Home(props: any) {
  const userInfoFetchStatus: String = useSelector((state: StoreState) => state.user.status);
  const userTeams: any[] = useSelector((state: StoreState) => state.user.teams);
  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <div className='grid grid-cols-10 gap-6 bg-lightGrey p-10 min-h-screen'>
          <div className='col-span-3'>
            <div className='bg-white rounded-xl hover:drop-shadow-md'>
              <MyTeams teams={userTeams} />
            </div>
            <div className='pt-5'>
              <div className='grid grid-cols-1 bg-white hover:drop-shadow-md rounded-xl'>
                <MyFriends friends={friendData} />
              </div>
            </div>
          </div>
          <div className='col-span-7 hover:drop-shadow-md rounded-xl'>
            <MyNews news={mynews} />
          </div>
        </div>
      )}
    </>
  );
}
