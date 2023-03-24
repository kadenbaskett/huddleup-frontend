import './NavBar.module.css';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';
import { useWindowResize } from '@services/helpers';

export default function Navbar() {
  const user = useSelector((store: StoreState) => store.user.userInfo);
  const windowSize: number[] = useWindowResize();

  let flexWrap = '';
  if (windowSize[0] < 600 && windowSize[0] !== 0) {
    flexWrap = 'flex-wrap';
  }

  return (
    <>
      <nav
        className={`relative flex items-center justify-between px-2 py-3 bg-darkBlue ${flexWrap}`}
      >
        <div className='container px-4'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link
              className='text-3xl font-varsity leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
              href='/'
            >
              Huddle Up
            </Link>
          </div>
        </div>
        <div className={'lg:flex flex-grow items-center px-4'} id='example-navbar-danger'>
          <ul className='flex list-none'>
            {user !== null && (
              <>
                <li className='nav-item'>
                  <Link
                    className=' py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                    href='/home'
                  >
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='pl-5 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                    href='/friends'
                  >
                    Friends
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='pl-5 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                    href='/leagues'
                  >
                    Leagues
                  </Link>
                </li>
              </>
            )}
            <li className='nav-item'>
              {user == null ? (
                <Link
                  className='bg-orange rounded-lg px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                  href='/login'
                >
                  Login
                </Link>
              ) : (
                <Link
                  href='/profile'
                  className='text-orange px-3 py-2 flex items-center  hover:opacity-75'
                >
                  <FaRegUser size='1.7rem' />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
