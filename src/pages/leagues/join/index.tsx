import { Button, TextInput } from '@mantine/core';
import { fetchPublicLeaguesThunk } from '@store/slices/globalSlice';
import { AppDispatch, StoreState } from '@store/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { JoinLeagueCard, joinleagueProps } from '../../../components/JoinLeagueCard/JoinLeagueCard';

function leagues() {
  /*
   * Use this later to search for leagues that have the 'searchTerm' in it and populate the page with those leagues
   */
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
    //  when this changes I can searchs the database here for public leagues that have a name similar to this.
  };

  /*
   * Pulling data from backend
   */
  const dispatch = useDispatch<AppDispatch>();
  // const userLeaguesFetchStatus = useSelector((state: StoreState) => state.user.status);
  const globalFetchStatus = useSelector((state: StoreState) => state.global.status);
  const publicLeagues = useSelector((state: StoreState) => state.global.publicLeagues);

  useEffect(() => {
    if (globalFetchStatus === 'idle') {
      dispatch(fetchPublicLeaguesThunk());
    }
  }, [globalFetchStatus, dispatch]);

  const leagueData = publicLeagues.map((league) => {
    const l: joinleagueProps = {
      name: league.name,
      id: league.id,
      subText: 'This is an example league description',
      numMaxPlayers: 6,
      numMinPlayers: 2,
      scoring: 'Points Per Reception',
      totalTeams: 15,
      numTeams: 10,
    };
    return l;
  });

  const renderLeagues = () => {
    return leagueData.map((league) => renderLeague(league));
  };

  const renderLeague = (league: joinleagueProps) => {
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
            onChange={handleChange}
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
