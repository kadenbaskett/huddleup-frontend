import '../styles/globals.css';
import type {AppProps} from 'next/app';
import NavBar from '../components/NavBar/NavBar';

export default function App({Component, pageProps}: AppProps) {
  return (
    <div className='bg-gray-300'>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
