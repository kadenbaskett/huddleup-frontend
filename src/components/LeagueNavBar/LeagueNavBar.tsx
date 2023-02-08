import { Center, Group } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { CiFootball } from 'react-icons/ci';
import { TiFlowMerge } from 'react-icons/ti';
import { RiBarChart2Fill } from 'react-icons/ri';
import { TbClipboardText } from 'react-icons/tb';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
export interface leagueNavbarProps {
  teamName: string;
  teamId: Number;
  leagueName: string;
  leagueId: Number;
  page: string;
}

export default function LeagueNavBar(props: leagueNavbarProps) {
  if (!props.teamId || !props.leagueId) return <></>;
  return (
    <>
      <div className='bg-slate-300 h-40"'>
        <div className='grid flex grid-rows-1'></div>
        <div className='text-5xl text-center font-varsity text-darkBlue grid-rows-3'>
          {props.teamName}
        </div>
        <Center>
          <Group>
            <div className='text-3xl text-center font-varsity text-orange grid-rows-3'>
              {props.leagueName}
            </div>
          </Group>
        </Center>
      </div>
      <div className='bg-darkBlue'>
        <div className='lg:pl-40 lg:pr-40 2xl:pl-80 2xl:pr-80'>
          <div className='grid grid-cols-6 flex'>
            <Link href={'/leagues/' + props.leagueId.toString() + '/home/overview'}>
              <div
                className={`${
                  props.page === 'home'
                    ? 'bg-orange hover:bg-darkOrange'
                    : 'bg-darkBlue hover:bg-darkerBlue'
                } hover:cursor-pointer p-4'`}
              >
                <div className='text-white'>
                  <Center>
                    <CiFootball size={50} />
                  </Center>
                </div>
                <div className='text-xl font-OpenSans font-bold text-white text-center'>Home</div>
              </div>
            </Link>
            <Link href={'/leagues/' + props.leagueId.toString() + '/matchups'}>
              <div
                className={`${
                  props.page === 'matchups'
                    ? 'bg-orange hover:bg-darkOrange'
                    : 'bg-darkBlue hover:bg-darkerBlue'
                }  hover:cursor-pointer'`}
              >
                <div className='text-white'>
                  <Center>
                    <TiFlowMerge size={50} />
                  </Center>
                </div>
                <div className='text-xl font-OpenSans font-bold text-white text-center'>
                  Matchups
                </div>
              </div>
            </Link>
            <Link href={'/leagues/' + props.leagueId.toString() + '/standings'}>
              <div
                className={`${
                  props.page === 'standings'
                    ? 'bg-orange hover:bg-darkOrange'
                    : 'bg-darkBlue hover:bg-darkerBlue'
                }  hover:cursor-pointer'`}
              >
                <div className='text-white'>
                  <Center>
                    <RiBarChart2Fill size={50} />
                  </Center>
                </div>
                <div className='text-xl font-OpenSans font-bold text-white text-center'>
                  Standings
                </div>
              </div>
            </Link>
            <Link
              href={'/leagues/' + props.leagueId.toString() + '/team/' + props.teamId.toString()}
            >
              <div
                className={`${
                  props.page === 'team'
                    ? 'bg-orange hover:bg-darkOrange'
                    : 'bg-darkBlue hover:bg-darkerBlue'
                }  hover:cursor-pointer'`}
              >
                <div className='text-white'>
                  <Center>
                    <TbClipboardText size={50} />
                  </Center>
                </div>
                <div className='text-xl font-OpenSans font-bold text-white text-center'>Team</div>
              </div>
            </Link>
            <Link href={'/leagues/' + props.leagueId.toString() + '/players'}>
              <div
                className={`${
                  props.page === 'players'
                    ? 'bg-orange hover:bg-darkOrange'
                    : 'bg-darkBlue hover:bg-darkerBlue'
                }  hover:cursor-pointer'`}
              >
                <div className='text-white'>
                  <Center>
                    <BsFillPeopleFill size={50} />
                  </Center>
                </div>
                <div className='text-xl font-OpenSans font-bold text-white text-center'>
                  Players
                </div>
              </div>
            </Link>
            <Link href={'/leagues/' + props.leagueId.toString() + '/settings'}>
              <div
                className={`${
                  props.page === 'settings'
                    ? 'bg-orange hover:bg-darkOrange'
                    : 'bg-darkBlue hover:bg-darkerBlue'
                } hover:cursor-pointer'`}
              >
                <div className='text-white'>
                  <Center>
                    <FiSettings size={50} />
                  </Center>
                </div>
                <div className='text-xl font-OpenSans font-bold text-white text-center'>
                  Settings
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <nav></nav>
    </>
  );
}
