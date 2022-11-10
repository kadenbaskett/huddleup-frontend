/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Image from 'next/image';
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
          <Image src='/assets/huddle-up-logo.png' alt='huddle logo' width={700} height={700} />
          <p className='landingText'>
            Huddle up is and will remain the dopest shit you've ever seen. You can't even comprehend
            how sick this is
          </p>
        </main>
        <Image
          className='landingImage'
          src='/assets/istockfield.png'
          alt='field png'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
    </>
  );
}
