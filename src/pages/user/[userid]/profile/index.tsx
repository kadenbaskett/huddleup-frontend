import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid, TextInput } from '@mantine/core';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';

export default function index() {
  const userInfoFetchStatus = useSelector((state: StoreState) => state.user.status);
  const user = useSelector((state: StoreState) => state.user);

  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <>
          <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='font-varsity text-5xl text-orange p-10'>{user.userInfo.username}</div>
            <Grid>
              <Grid.Col>
                <TextInput value={user.userInfo.username} label='Username' />
              </Grid.Col>

              <Grid.Col>
                <TextInput value={user.userInfo.email} label='Email' />
              </Grid.Col>

              <Grid.Col span={12}></Grid.Col>
            </Grid>
          </div>
        </>
      )}
    </>
  );
}
