import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import MyFriends from './components/MyFriends/MyFriends';
import MyNews from './components/MyNews/MyNews';
import MyTeams from './components/MyTeams/MyTeams';
import { Friend, News, Team } from './types';

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

const teams: Team[] = [
  {
    id: 0,
    name: 'Justins Team',
    rank: 1,
    wins: 10,
    losses: 0,
  },
  {
    id: 1,
    name: 'Jakes Team',
    rank: 2,
    wins: 9,
    losses: 1,
  },
  {
    id: 2,
    name: 'Kadens Team',
    rank: 3,
    wins: 8,
    losses: 2,
  },
  {
    id: 3,
    name: 'Joes Team',
    rank: 4,
    wins: 5,
    losses: 5,
  },
  {
    id: 4,
    name: 'Some bums Team',
    rank: 5,
    wins: 0,
    losses: 10,
  },
];

export default function Home(props: any) {
  const userInfoFetchStatus: String = useSelector((state: StoreState) => state.user.status);
  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <div className='grid grid-cols-10 gap-6 bg-lightGrey p-10 min-h-screen'>
          <div className='col-span-3'>
            <div className='bg-white rounded-xl hover:drop-shadow-md'>
              <MyTeams teams={teams} />
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
