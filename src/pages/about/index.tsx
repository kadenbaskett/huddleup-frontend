import { Grid } from '@mantine/core';
import React from 'react';
import dashImg from '@public/assets/huddleup-3.png';
import Image from 'next/image';

export default function index() {
  return (
    <div className='bg-lightGrey p-5'>
      <div className='bg-white min-h-screen rounded-xl p-5'>
        <div className='font-varsity text-4xl text-darkBlue text-center'>About</div>
        <Grid>
          <Grid.Col span={6}>
            <div className='font-varsity text-xl text-darkBlue'>Abstract</div>
            <div className='text-sm font-openSans'>
              HuddleUp is a group-based fantasy football app that seeks to recreate the comradery of
              team sports.{' '}
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className='position-absolute'>
              <Image src={dashImg} alt='huddle logo' width={500} height={500} objectFit='cover' />
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
