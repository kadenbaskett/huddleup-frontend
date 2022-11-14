import React from 'react';
import './NavBar.module.css';

export default function Navbar() {
  return (
    <>
      <nav className='relative flex flex-wrap items-center justify-between px-2 py-3 bg-darkBlue mb-3'>
        <div className='container px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
            <a
              className='text-3xl font-varsity leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white'
              href='/'
            >
              Huddle Up
            </a>
          </div>
          <div className={'lg:flex flex-grow items-center'} id='example-navbar-danger'>
            <ul className='flex flex-col lg:flex-row list-none lg:ml-auto'>
              <li className='nav-item'>
                <a
                  className='px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                  href='/home'
                >
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                  href='#'
                >
                  Friends
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='px-3 py-2 flex items-center text-2xl uppercase font-varsity leading-snug text-white hover:opacity-75'
                  href='#'
                >
                  Leagues
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
