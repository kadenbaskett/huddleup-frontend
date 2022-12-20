import React from 'react';
import Image from 'next/image';
import NFL from '../../public/assets/jakewhiteprofessionalpic.png';
import styles from './FriendCard.module.css';
import { Button, Grid, Group, Anchor } from '@mantine/core';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';

export interface friendProps {
  name: string;
  // This subtext could probably be the mutual leagues count
  // subText: string;
  id: number;
}

export function FriendCard(friend: friendProps) {
  return (
    <div
      id={styles.card}
      className='bg-white rounded-xl border border-white h-[7rem] hover:border-orange'
    >
      <Grid>
        <Grid.Col span='auto'>
          <Group position='left'>
            <Image src={NFL} alt={friend.name + '-image'} height={100} width={100} />
            <div className='text-6xl font-varsity text-darkBlue pt-1'>{friend.name}</div>
          </Group>
        </Grid.Col>

        <Group position='right'>
          <Grid.Col span='auto'>
            <Grid justify='flex-end'>
              <Grid.Col className='pt-5 pl-5 pr-5'>
                <Anchor href={`/friends/${friend.id}/profile`}>
                  <Button
                    leftIcon={<BsFillPersonFill />}
                    className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                    variant='default'
                    size='sm'
                  >
                    View Profile
                  </Button>
                </Anchor>
              </Grid.Col>
              <Grid.Col className='pb-5 pl-5 pr-5'>
                <Anchor href='/friends'>
                  <Button
                    leftIcon={<AiOutlineMinus />}
                    className='hover:bg-red hover:text-white text-xl font-bold hover:border hover:border-red rounded bg-transparent text-red border-red transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                    variant='default'
                    size='sm'
                  >
                    Remove
                  </Button>
                </Anchor>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Group>
      </Grid>
    </div>
  );
}
