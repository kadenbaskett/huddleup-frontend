import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar/NavBar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Head>
          <title>Huddle Up Home</title>
        </Head>

        <main className={styles.main}>
          <Image
            src="/assets/huddle-up-logo.png"
            alt="huddle logo"
            width={700}
            height={700}
          />
        </main>

        <footer className={styles.footer}>this is a footer bitch</footer>
      </div>
    </>
  );
}
