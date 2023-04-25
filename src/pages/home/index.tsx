import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { News } from '@interfaces/news.interface';
import { Button, Grid, TextInput } from '@mantine/core';
import { useWindowResize } from '@services/helpers';
import { StoreState } from '@store/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MyNews from '../../components/MyNews/MyNews';
import MyTeams from '../../components/MyTeams/MyTeams';
import { sendSetWeek } from '@services/apiClient';

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
  const user: any = useSelector((state: StoreState) => state.user);
  const userLeagues: any[] = useSelector((state: StoreState) => state.user.leagues);
  const news: News[] = useSelector((state: StoreState) => state.global.news);
  const currentWeek = useSelector((state: StoreState) => state.global.week);

  const setWeek = async () => {
    await sendSetWeek(weekInput);
  };

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
  const [weekInput, setWeekInput] = useState(currentWeek);

  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <div className='gap-6 bg-lightGrey p-10 min-h-screen'>
          {user.userInfo.username.includes('talloryx0') && (
            <>
              <div className='p-5'>
                <div className='font-openSans text-xl'>Current Week:</div>
                <div className='flex'>
                  <TextInput
                    value={weekInput}
                    size='lg'
                    onChange={(e) => setWeekInput(Number(e.target.value))}
                  />
                  <div className='pl-5'>
                    <Button
                      className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                      variant='default'
                      radius='lg'
                      size='lg'
                      onClick={async () => await setWeek()}
                      disabled={weekInput < 1 || weekInput > 18}
                    >
                      Set Week
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
          <Grid columns={20}>
            <Grid.Col span={teamAndFriendSpan}>
              <div className='bg-white rounded-xl hover:drop-shadow-md'>
                <MyTeams teams={userTeams} leagues={userLeagues} />
              </div>
              <br></br>
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
