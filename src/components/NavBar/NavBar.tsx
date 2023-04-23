import './NavBar.module.css';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';
import { useWindowResize } from '@services/helpers';
import { useState } from 'react';
import ProfilePopup from '@components/ProfilePopup/ProfilePopup';
import { logout } from '../../firebase/firebase';
import { useDisclosure } from '@mantine/hooks';
import { Burger } from '@mantine/core';

export default function Navbar() {
  const user = useSelector((store: StoreState) => store.user.userInfo);
  const windowSize: number[] = useWindowResize();
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const [burgerOpen, { toggle }] = useDisclosure(false);

  let burgerVisible = false;
  if (windowSize[0] < 600 && windowSize[0] !== 0) {
    burgerVisible = true;
  }

  const onProfileClick = () => {
    setProfilePopupOpen(true);
  };

  const onProfilePopupClose = () => {
    setProfilePopupOpen(false);
  };

  const handleLogout = async () => {
    await logout();
  };

  const getPopup = () => {
    return (
      <>
        {burgerOpen ? (
          <>
            <div className='popout'>I POP OUT AT UR PARTY</div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };

  const getHomeAndLeagues = () => {
    return user === null ? (
      <></>
    ) : (
      <>
        <li className='nav-item'>
          <Link
            className='px-2 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
            href='/home'
          >
            Home
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='px-2 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
            href='/leagues'
          >
            Leagues
          </Link>
        </li>
      </>
    );
  };

  const getLoginOrProfile = () => {
    return (
      <li className='nav-item'>
        {user == null ? (
          <Link
            className='bg-orange rounded-lg px-2 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
            href='/login'
          >
            Login
          </Link>
        ) : (
          <Link
            href='#'
            className='text-orange px-2 py-2 flex items-center  hover:opacity-75'
            onClick={() => onProfileClick()}
          >
            <FaRegUser size='1.7rem' />
          </Link>
        )}
      </li>
    );
  };

  const getBurger = () => {
    return (
      <>
        {!burgerVisible ? (
          <></>
        ) : (
          <li className='nav-item py-2'>
            <Burger
              size='xl'
              color='white'
              className='bg-transparent'
              opened={burgerOpen}
              onClick={toggle}
            />
          </li>
        )}
      </>
    );
  };

  const navItems = () => {
    return (
      <ul className='flex list-none'>
        {!burgerVisible ? (
          <>
            {getHomeAndLeagues()}
            <li className='nav-item'>
              <Link
                className='px-2 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                href='/about'
              >
                About
              </Link>
            </li>
            {getLoginOrProfile()}
          </>
        ) : (
          <></>
        )}
      </ul>
    );
  };

  return (
    <>
      <nav className={'flex flex-wrap items-center justify-between py-3 bg-darkBlue'}>
        <div className='px-2'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <Link
              className='text-3xl font-varsity leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
              href='/'
            >
              Huddle Up
            </Link>
          </div>
        </div>
        <div className='flex justify-end'>
          <div className={'flex items-center px-2'}>
            <ul className='flex list-none'>{getBurger()}</ul>
          </div>
          <div className={'flex items-center px-2'}>
            {navItems()}
            {user !== null && (
              <ProfilePopup
                opened={profilePopupOpen}
                onClose={onProfilePopupClose}
                user={user}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </nav>
      {getPopup()}
    </>
  );
}
