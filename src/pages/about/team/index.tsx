import { Grid } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import Jake from '@public/assets/jakewhiteprofessionalpic.png';
import Justin from '@public/assets/justinperezprofessionalpic.jpg';
import Kaden from '@public/assets/kadenbaskettprofessionalpic.jpg';
import Joe from '@public/assets/joerodmanprofessionalpic.jpg';
import Link from 'next/link';

export default function index() {
  return (
    <div className='bg-lightGrey min-h-screen p-5 xl:pl-40 xl:pr-40'>
      <div className='bg-white rounded-xl p-5 pl-5 xl:pl-20 2xl:pl-40'>
        <div className='font-varsity text-4xl text-darkBlue text-center'>Team Members</div>
        <div className='text-center'>
          <Grid className='p-5'>
            <Grid.Col span={6}>
              <div className='font-varsity font-bold text-4xl'>Jake White</div>
              <div className='font-openSans text-2xl text-left'>
                I am a senior studying computer science at the University of Utah, and I am
                originally from Atlanta, Georgia. In my free time I enjoy playing chess,
                snowboarding, and skateboarding. I am passionate about computer science and will be
                pursuing a career at Cox Automotive.
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <Image src={Jake} alt='Jake White' width={400} height={400} />
            </Grid.Col>
            <Grid.Col className='font-bold text-xl' span={12}>
              Contact Info:
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Phone: 435-659-9077
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Email: jakewhiteyo@gmail.com
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              LinkedIn:{' '}
              <Link className='underline' href='https://www.linkedin.com/in/jakewhiteyo/'>
                https://www.linkedin.com/in/jakewhiteyo/
              </Link>
            </Grid.Col>
          </Grid>

          <Grid className='p-5'>
            <Grid.Col span={6}>
              <div className='grid place-items-end'>
                <Image src={Joe} alt='Joe Rodman' width={500} height={500} />
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='font-varsity font-bold text-4xl'>Joe Rodman</div>
              <div className='font-openSans text-2xl text-left'>
                I am a senior studying computer science at the University of Utah, and I am
                originally from Atlanta, Georgia. In my free time I enjoy playing chess,
                snowboarding, and skateboarding. I am passionate about computer science and will be
                pursuing a career at Cox Automotive.
              </div>
            </Grid.Col>
            <Grid.Col className='font-bold text-xl' span={12}>
              Contact Info:
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Phone: 508-233-0563
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Email: joesephrodman5@gmail.com
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              LinkedIn:{' '}
              <Link className='underline' href='https://www.linkedin.com/in/josephrodman/'>
                https://www.linkedin.com/in/josephrodman/
              </Link>
            </Grid.Col>
          </Grid>

          <Grid className='p-5'>
            <Grid.Col span={6}>
              <div className='font-varsity font-bold text-4xl'>Justin Perez</div>
              <div className='font-openSans text-2xl text-left'>
                I am a senior studying computer science at the University of Utah, and I am
                originally from Atlanta, Georgia. In my free time I enjoy playing chess,
                snowboarding, and skateboarding. I am passionate about computer science and will be
                pursuing a career at Cox Automotive.
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <Image src={Justin} alt='Justin Perez' width={300} height={300} />
            </Grid.Col>
            <Grid.Col className='font-bold text-xl' span={12}>
              Contact Info:
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Phone: 770-778-0722
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Email: justinprz12@gmail.com
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              LinkedIn:{' '}
              <Link className='underline' href='https://www.linkedin.com/in/justindperez/'>
                https://www.linkedin.com/in/justindperez/
              </Link>
            </Grid.Col>
          </Grid>

          <Grid className='p-5'>
            <Grid.Col span={6}>
              <div className='grid place-items-end'>
                <Image src={Kaden} alt='Kaden Baskett' width={500} height={500} />
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='font-openSans font-bold text-4xl'>Kaden Baskett</div>
              <div className='font-openSans text-2xl text-left'>
                I am a senior studying computer science at the University of Utah. I am originally
                from Boise, Idaho. In my free time I enjoy skiing, hiking, and studying financial
                markets. I've thoroughly enjoyed my education in computer science at Utah and am
                excited to begin my professional career as a software developer for Nerd United, a
                Web3 development company.
              </div>
            </Grid.Col>
            <Grid.Col className='font-bold text-xl' span={12}>
              Contact Info:
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Phone: 208-949-3157
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              Email: kadenbaskett@gmail.com
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              LinkedIn:{' '}
              <Link
                className='underline'
                href='https://www.linkedin.com/in/kaden-baskett-729143191/'
              >
                https://www.linkedin.com/in/kaden-baskett-729143191/
              </Link>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  );
}
