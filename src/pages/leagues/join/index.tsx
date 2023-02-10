import { League } from '@interfaces/league.interface';
import { Button, TextInput } from '@mantine/core';
import { StoreState } from '@store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { JoinLeagueCard } from '@components/JoinLeagueCard/JoinLeagueCard';

function leagues() {
  const publicLeagues = useSelector((state: StoreState) => state.global.publicLeagues);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(
      publicLeagues.filter((league) => {
        const leagueName = `${league.name}`;
        for (const word of searchTerm.toString().split(' ')) {
          if (leagueName.toLowerCase().includes(word.toLowerCase())) return true;
        }
        return false;
      }),
    );
  }, [searchTerm]);

  const renderLeagues = () => {
    return results.map((league) => renderLeague(league));
  };

  const renderLeague = (league: League) => {
    return (
      <div className='grid col-span-10 pb-2'>
        <JoinLeagueCard {...league} />
      </div>
    );
  };

  /*
   * Start of Join a League Page
   */
  return (
    <div className='bg-lightGrey min-h-screen'>
      <div>
        <div className='pt-10 pb-2 pl-10'>
          <label className='font-varsity text-6xl'>Join A League</label>
        </div>
        <div className='pb-2 pl-10 pr-10 pt-2'>
          <Button
            className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
            variant='default'
            size='xl'
            type='submit'
          >
            Find By League Token
          </Button>
        </div>
        <div className='pr-10 pl-10 pb-10 pt-5 '>
          <TextInput
            placeholder='Search Public Leagues'
            size='xl'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
            autoFocus
            autoComplete='off'
            styles={() => ({
              input: {
                fontFamily: 'Varsity Team',
                color: '#ff6b00',
                fontSize: '3rem',
              },
            })}
          />
          <div className='pt-5'>{renderLeagues()}</div>
        </div>
      </div>
    </div>
  );
}

export default leagues;
