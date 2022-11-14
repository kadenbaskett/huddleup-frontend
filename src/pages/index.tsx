/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Image from 'next/image';
import * as logo from './../public/assets/huddle-up-logo.png';
import * as bgImg from './../public/assets/istockfield.png';
// import NavBar from '../components/NavBar/NavBar';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
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
          <div className='grid grid-cols-2 gap-3'>
            <button className='py-7 px-20 hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>
              Sign Up
            </button>
            <button className='py-7 px-20 hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>
              Login
            </button>
          </div>
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
    </>
  );
}
