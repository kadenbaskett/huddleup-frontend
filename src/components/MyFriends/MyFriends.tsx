import React from 'react';
import Image from 'next/image';
import ProfilePic from '../../public/assets/jakewhiteprofessionalpic.png';
import styles from './MyFriends.module.css';
import { Anchor, Grid, Group } from '@mantine/core';
export interface myFriendProps {
  name: string;
  // This subtext could probably be the mutual leagues count
  // subText: string;
  id: number;
}

export default function MyFriends(friend: myFriendProps) {
  return (
    <Anchor href={`/friends/${friend.id}/profile`} variant='text'>
      <div
        id={styles.card}
        className='bg-white rounded-xl border border-white h-[7rem] hover:border-orange'
      >
        <Grid>
          <Grid.Col span='auto'>
            <Group position='left'>
              <Image src={ProfilePic} alt={friend.name + '-image'} height={100} width={100} />
              <div className='text-4xl font-varsity text-darkBlue pt-1'>{friend.name}</div>
            </Group>
          </Grid.Col>
        </Grid>
      </div>
    </Anchor>
  );
}
