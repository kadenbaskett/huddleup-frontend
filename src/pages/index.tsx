/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as logo from '@public/assets/huddle-up-logo.png';
import * as bgImg from '@public/assets/fieldFixed.png';
// import NavBar from '../components/NavBar/NavBar';
import styles from '@styles/Home.module.css';
import { Button, Group } from '@mantine/core';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export default function Home() {
  const user = useSelector((state: StoreState) => state.user.userInfo);

  return (
    <div className={styles.container}>
      <div className='min-h-screen'>
        <Head>
          <title>Huddle Up Home</title>
        </Head>
        <main className={styles.main}>
          <Image src={logo} alt='huddle logo' width={700} height={700} />
          <p className='landingText'>
            Huddle up is a group fantasy football app intended to recreate the comradery of team
            sports.
          </p>
          {user ? (
            <></>
          ) : (
            <Group>
              <Link href='/signup'>
                <Button
                  className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  size='xl'
                >
                  Sign Up
                </Button>
              </Link>
              <Link href={'/login'}>
                <Button
                  className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  size='xl'
                >
                  Login
                </Button>
              </Link>
            </Group>
          )}
        </main>
        <Image
          className='landingImage'
          src={bgImg}
          alt='field png'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
    </div>
  );
}
