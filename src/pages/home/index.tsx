import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { News } from '@interfaces/news.interface';
import { Grid } from '@mantine/core';
import { useWindowResize } from '@services/helpers';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import MyFriends from '../../components/MyFriends/MyFriends';
import MyNews from '../../components/MyNews/MyNews';
import MyTeams from '../../components/MyTeams/MyTeams';
import { Friend } from './types';

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

// const mynews: News[] = [
//   { news: 'This wil be news about something' },
//   { news: 'This should be some other news about a player or something along those lines.' },
//   {
//     news: 'Some more relevant news.',
//   },
//   {
//     news: 'Finally more news',
//   },
// ];

export default function Home(props: any) {
  const userInfoFetchStatus: String = useSelector((state: StoreState) => state.user.status);
  const userTeams: any[] = useSelector((state: StoreState) => state.user.teams);
  const userLeagues: any[] = useSelector((state: StoreState) => state.user.leagues);
  const news: News[] = useSelector((state: StoreState) => state.global.news);

  const windowSize = useWindowResize();
  let teamAndFriendSpan;
  let newsSpan;
  if (windowSize[0] === 0 || windowSize[0] > 1050) {
    teamAndFriendSpan = 6;
    newsSpan = 14;
  } else {
    teamAndFriendSpan = 20;
    newsSpan = 20;
  }

  const dontShow = false;
  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <div className='gap-6 bg-lightGrey p-10 min-h-screen'>
          <Grid columns={20}>
            <Grid.Col span={teamAndFriendSpan}>
              <div className='bg-white rounded-xl hover:drop-shadow-md'>
                <MyTeams teams={userTeams} leagues={userLeagues} />
              </div>
              <br></br>
              <div className='bg-white hover:drop-shadow-md rounded-xl'>
                {dontShow && <MyFriends friends={friendData} />}
              </div>
            </Grid.Col>
            <Grid.Col span={newsSpan}>
              <div className='hover:drop-shadow-md rounded-xl'>
                <MyNews news={news} />
              </div>
            </Grid.Col>
          </Grid>
        </div>
      )}
    </>
  );
}
