/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import * as logo from '@public/assets/huddle-up-logo.png';
import * as bgImg from '@public/assets/fieldFixed.png';
// import NavBar from '../components/NavBar/NavBar';
import styles from '@styles/Home.module.css';
import { Button, Group } from '@mantine/core';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Huddle Up Home</title>
      </Head>
      <main className={styles.main}>
        <Image src={logo} alt='huddle logo' width={700} height={700} />
        <p className='landingText'>
          Huddle up is and will remain the dopest shit you've ever seen. You can't even comprehend
          how sick this is
        </p>
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
  );
}
