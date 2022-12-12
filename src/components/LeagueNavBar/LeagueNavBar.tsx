import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { HiArrowLeft } from 'react-icons/hi';
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
  return (
    <>
      <div className='grid flex bg-slate-300 h-40"'>
        <div className='grid-rows-1'>
          <Link href={'/leagues'}>
            <Button
              leftIcon={<HiArrowLeft />}
              className='font-bold bg-orange hover:bg-transparent border-orange text-lg text-white hover:text-orange'
            >
              Exit league
            </Button>
          </Link>
        </div>
        <div className='text-8xl text-center font-varsity text-darkBlue grid-rows-2 items-end'>
          {props.teamName}
        </div>
        <div className='text-5xl text-center font-varsity text-orange grid-rows-3'>
          {props.leagueName}
        </div>
      </div>
      <div className='grid grid-cols-6 bg-darkBlue flex'>
        <Link href={'/leagues/' + props.leagueId.toString() + '/home'}>
          <div
            className={`${
              props.page === 'home'
                ? 'bg-orange hover:bg-darkOrange'
                : 'bg-darkBlue hover:bg-darkerBlue'
            } hover:cursor-pointer p-4'`}
          >
            <div className='h-20 text-white'>
              <CiFootball size='1x' />
            </div>
            <div className='text-2xl font-OpenSans font-bold text-white text-center'>Home</div>
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
            <div className='h-20 text-white'>
              <TiFlowMerge size='1x' />
            </div>
            <div className='text-2xl font-OpenSans font-bold text-white text-center'>Matchups</div>
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
            <div className='h-20 text-white'>
              <RiBarChart2Fill size='1x' />
            </div>
            <div className='text-2xl font-OpenSans font-bold text-white text-center'>Standings</div>
          </div>
        </Link>
        <Link href={'/leagues/' + props.leagueId.toString() + '/team'}>
          <div
            className={`${
              props.page === 'team'
                ? 'bg-orange hover:bg-darkOrange'
                : 'bg-darkBlue hover:bg-darkerBlue'
            }  hover:cursor-pointer'`}
          >
            <div className='h-20 text-white'>
              <TbClipboardText size='1x' />
            </div>
            <div className='text-2xl font-OpenSans font-bold text-white text-center'>Team</div>
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
            <div className='h-20 text-white'>
              <BsFillPeopleFill size='1x' />
            </div>
            <div className='text-2xl font-OpenSans font-bold text-white text-center'>Players</div>
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
            <div className='h-20 text-white'>
              <FiSettings size='1x' />
            </div>
            <div className='text-2xl font-OpenSans font-bold text-white text-center'>Settings</div>
          </div>
        </Link>
      </div>
      <nav></nav>
    </>
  );
}
