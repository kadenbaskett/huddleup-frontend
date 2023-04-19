import React from 'react';
import styles from './MyFriends.module.css';
import { Grid, Group } from '@mantine/core';
import Link from 'next/link';
import { Friend } from '@interfaces/types.interface';
export interface myFriendProps {
  friends: Friend[];
}

const renderFriend = (friend: Friend) => {
  return (
    <Link href={`/user/${Number(friend.id)}/profile`}>
      <div
        id={styles.card}
        className='bg-white rounded-xl border border-white h-[7rem] hover:border-orange'
      >
        <Grid>
          <Grid.Col span='auto'>
            <Group position='left'>
              <div className='text-xl font-varsity text-darkBlue pt-1'>{friend.name}</div>
            </Group>
          </Grid.Col>
        </Grid>
      </div>
    </Link>
  );
};

export default function MyFriends(props: myFriendProps) {
  return (
    <>
      <Link href='/friends'>
        <div className='flex font-varsity justify-left p-4 text-3xl bg-darkBlue text-white rounded-t-xl'>
          My Friends
        </div>
      </Link>
      {props.friends.map((friend: Friend) => renderFriend(friend))}
    </>
  );
}
