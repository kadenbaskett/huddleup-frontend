import React from 'react';
import LeagueCard from '../../components/LeagueCard/LeagueCard';

function leagues() {
  return (
    <div className='grid grid-cols-10 bg-slate-300 p-10 min-h-screen gap-3'>
      <div className='col-span-4'>
        <div className='grid grid-cols-2 gap-3'>
          <button className='py-7 px-20 hover:bg-transparent hover:text-orange text-xl font-bold border border-orange rounded bg-orange text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>
            Join a League
          </button>
          <button className='py-7 px-20 hover:bg-transparent hover:text-green text-xl font-bold border border-green rounded bg-green text-white transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'>
            Create a League
          </button>
        </div>
      </div>
      <div className='col-span-10'>
        <LeagueCard />
      </div>
    </div>
  );
}

export default leagues;
