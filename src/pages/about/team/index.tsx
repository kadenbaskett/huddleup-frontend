/* eslint-disable import/no-duplicates */
import { Grid, Group } from '@mantine/core';
import React from 'react';
import Image from 'next/image';
import Jake from '@public/assets/jakewhiteprofessionalpic.jpg';
import Justin from '@public/assets/justinperezprofessionalpic.png';
import Kaden from '@public/assets/kadenbaskettprofessionalpic.jpg';
import Joe from '@public/assets/joerodmanprofessionalpic.jpg';
import TeamHuddleUp from '@public/assets/TeamHuddleUp.png';
import Link from 'next/link';
import { AiFillPhone } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { AiFillLinkedin } from 'react-icons/ai';

export default function index() {
  return (
    <div className='bg-lightGrey min-h-screen p-5 xl:pl-40 xl:pr-40'>
      <div className='bg-white rounded-xl p-5 pl-5 xl:pl-20 2xl:pl-40'>
        <div className='font-varsity text-4xl text-darkBlue text-center pb-5'>
          We are huddle up!
        </div>
        <Group position='center'>
          <Image src={TeamHuddleUp} alt='Joe Rodman' width={500} height={500} />
        </Group>
        <div className='font-varsity text-4xl text-darkBlue text-center pt-2 pb-5'>
          Team Members
        </div>
        <div className='text-center'>
          <Grid className='p-5'>
            <Grid.Col span={6}>
              <div className='font-varsity font-bold text-4xl'>Jake White</div>
              <div className='font-openSans text-2xl text-left'>
                Originally from Park City, Utah. I have spent my last year at the University of Utah
                learning and growing as a developer. In my free time, I enjoy running, snowboarding,
                biking, camping, and listening to music. After graduation, I will begin my career as
                a software engineer for GEICO.
              </div>
              <div className='pt-2 font-bold text-xl'>
                Contact Info:
                <div className='font-openSans font-normal text-lg'>
                  <Group position='center'>
                    <AiFillPhone />
                    435-659-9077
                  </Group>
                </div>
                <div className='font-openSans font-normal text-lg'>
                  <Group position='center'>
                    <MdEmail /> jakewhiteyo@gmail.com
                  </Group>
                </div>
                <div className='font-openSans font-normal text-lg'>
                  <Group position='center'>
                    <AiFillLinkedin />
                    <Link className='underline' href='https://www.linkedin.com/in/jakewhiteyo/'>
                      jakewhiteyo
                    </Link>
                  </Group>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                className='rotate-3 hover:rotate-0 transition ease-in-out duration-300'
                src={Jake}
                alt='Jake White'
                width={400}
                height={400}
              />
            </Grid.Col>
          </Grid>

          <Grid className='p-5'>
            <Grid.Col span={6}>
              <div className='grid place-items-end'>
                <Image
                  className='-rotate-3 hover:rotate-0 transition ease-in-out duration-300'
                  src={Joe}
                  alt='Joe Rodman'
                  width={500}
                  height={500}
                />
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className='font-varsity font-bold text-4xl'>Joe Rodman</div>
              <div className='font-openSans text-2xl text-left'>
                I took my first programming class three years ago and feel very blessed to have
                found a career that I find really interesting, that teaches me something new every
                day, and that provides me the opportunity to solve interesting problems. Of all the
                topics in CS, I'm most interested in algorithms, and someday I would love to teach
                an algorithms class. I currently work part time as a Software Engineer at Marq
                (formerly LucidPress) in Draper and am really looking forward to starting there as a
                full-time Software Engineer at Marq (formerly LucidPress) after graduation.
              </div>
              <div className='pt-2 font-bold text-xl'>Contact Info:</div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <AiFillPhone /> 508-233-0563
                </Group>
              </div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <MdEmail /> joesephrodman5@gmail.com
                </Group>
              </div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <AiFillLinkedin />
                  <Link className='underline' href='https://www.linkedin.com/in/josephrodman/'>
                    josephrodman
                  </Link>
                </Group>
              </div>
            </Grid.Col>
            <Grid.Col className='font-openSans text-lg' span={12}>
              <Link className='underline' href='https://www.josephrodman.com' target='_href'>
                www.josephrodman.com/
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
              <div className='pt-2 font-bold text-xl'>Contact Info:</div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <AiFillPhone /> 770-778-0722
                </Group>
              </div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <MdEmail /> justinprz12@gmail.com
                </Group>
              </div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <AiFillLinkedin />
                  <Link className='underline' href=' https://www.linkedin.com/in/justindperez/'>
                    justindperez
                  </Link>
                </Group>
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                className='rotate-3 hover:rotate-0 transition ease-in-out duration-300'
                src={Justin}
                alt='Justin Perez'
                width={500}
                height={500}
              />
            </Grid.Col>
          </Grid>

          <Grid className='p-5'>
            <Grid.Col span={6}>
              <div className='grid place-items-end'>
                <Image
                  className='-rotate-3 hover:rotate-0 transition ease-in-out duration-300'
                  src={Kaden}
                  alt='Kaden Baskett'
                  width={450}
                  height={450}
                />
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
              <div className='pt-2 font-bold text-xl'>Contact Info:</div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <AiFillPhone /> 208-949-3157
                </Group>
              </div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <MdEmail /> kadenbaskett@gmail.com
                </Group>
              </div>
              <div className='font-openSans text-lg'>
                <Group position='center'>
                  <AiFillLinkedin />
                  <Link className='underline' href='https://www.linkedin.com/in/kadenbaskett/'>
                    kadenbaskett
                  </Link>
                </Group>
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </div>
  );
}
