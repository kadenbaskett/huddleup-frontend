import { Grid } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import Jake from '@public/assets/jakewhiteprofessionalpic.png';
import Justin from '@public/assets/justinperezprofessionalpic.jpg';
import Kaden from '@public/assets/kadenbaskettprofessionalpic.jpg';
import Joe from '@public/assets/joerodmanprofessionalpic.jpg';

export default function index() {
  return (
    <div className='bg-lightGrey p-5'>
      <div className='bg-white min-h-screen rounded-xl p-5'>
        <div className='font-varsity text-4xl text-darkBlue text-center'>Team Members</div>
        <Grid className='p-5'>
          <Grid.Col span={6}>
            <div className='font-openSans font-bold text-xl'>Jake White Bio</div>
            <div className='font-openSans text-md'>Jake was born and stsuff</div>
          </Grid.Col>
          <Grid.Col span={6}>
            <Image src={Jake} alt='Jake White' width={200} height={200} />
          </Grid.Col>
          <Grid.Col span={12}>Contact Info:</Grid.Col>
          <Grid.Col span={6}>Phone: 435-659-9077</Grid.Col>
          <Grid.Col span={6}>Email: jakewhiteyo@gmail.com</Grid.Col>
        </Grid>

        <Grid className='p-5'>
          <Grid.Col span={6}>
            <Image src={Joe} alt='Jake White' width={200} height={200} />
          </Grid.Col>
          <Grid.Col span={6}>
            <div className='font-openSans font-bold text-xl'>Joe Rodman Bio:</div>
            <div className='font-openSans text-md'>Joe was born and stsuff</div>
          </Grid.Col>
          <Grid.Col span={12}>Contact Info:</Grid.Col>
          <Grid.Col span={6}>Phone: 508-233-0563</Grid.Col>
          <Grid.Col span={6}>Email: joesephrodman5@gmail.com</Grid.Col>
        </Grid>

        <Grid className='p-5'>
          <Grid.Col span={6}>
            <div className='font-openSans font-bold text-xl'>Justin Perez Bio</div>
            <div className='font-openSans text-md'>
              I am a computer science major, and a senior here at the U.{' '}
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <Image src={Justin} alt='Jake White' width={200} height={200} />
          </Grid.Col>
          <Grid.Col span={12}>Contact Info:</Grid.Col>
          <Grid.Col span={6}>Phone: 770-778-0722</Grid.Col>
          <Grid.Col span={6}>Email: justinprz12@gmail.com</Grid.Col>
        </Grid>

        <Grid className='p-5'>
          <Grid.Col span={6}>
            <Image src={Kaden} alt='Jake White' width={200} height={200} />
          </Grid.Col>
          <Grid.Col span={6}>
            <div className='font-openSans font-bold text-xl'>Kaden Baskett Bio</div>
            <div className='font-openSans text-md'>Kaden was born and stsuff</div>
          </Grid.Col>
          <Grid.Col span={12}>Contact Info:</Grid.Col>
          <Grid.Col span={6}>Phone: 208-949-3157</Grid.Col>
          <Grid.Col span={6}>Email: justinprz12@gmail.com</Grid.Col>{' '}
        </Grid>
      </div>
    </div>
  );
}
