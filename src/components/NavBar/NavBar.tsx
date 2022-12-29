import './NavBar.module.css';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export default function Navbar() {
  const user = useSelector((store: StoreState) => store.user.userInfo);

  // for testing if the redux state is updating
  useEffect(() => {
    console.log('User just changed: ', user);
  }, [user]);

  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-darkBlue'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link
              className='text-3xl font-varsity leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
              href='/'
            >
              Huddle Up
            </Link>
          </div>
          <div className={'lg:flex flex-grow items-center'} id='example-navbar-danger'>
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='nav-item'>
                <Link
                  className='px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                  href='/home'
                >
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                  href='/friends'
                >
                  Friends
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                  href='/leagues'
                >
                  Leagues
                </Link>
              </li>
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
                    className='bg-orange rounded-lg px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                    href='/logout'
                  >
                    Logout
                  </Link>
                )}
              </li>
              <li className='nav-item'>
                {user == null ? (
                  <></>
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
        </div>
      </nav>
    </>
  );
}
