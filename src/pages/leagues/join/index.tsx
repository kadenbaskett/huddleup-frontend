import { Button, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { JoinLeagueCard, joinleagueProps } from '../../../components/JoinLeagueCard/JoinLeagueCard';

const leagueData: joinleagueProps[] = [
  {
    name: 'Longer league name',
    subText: 'This is an example league description',
    id: '1',
    numMinPlayers: 2,
    numMaxPlayers: 6,
    scoring: 'No Points Per Reception',
    totalTeams: 15,
    numTeams: 12,
  },
  {
    name: 'League 2',
    subText:
      'This is an example long league description that could potentially be too big but its not a big deal because the text should rap, wait I mean it should wrap, the text isnt Drake',
    id: '2',
    numMinPlayers: 2,
    numMaxPlayers: 6,
    scoring: 'Points Per Reception',
    totalTeams: 15,
    numTeams: 12,
  },
  {
    name: 'League 3',
    subText:
      'This is an example long league description that could potentially be too big but its not a big deal because the text should rap, wait I mean it should wrap, the text isnt Drake',
    id: '3',
    numMinPlayers: 2,
    numMaxPlayers: 5,
    scoring: 'Points Per Reception',
    totalTeams: 10,
    numTeams: 5,
  },
  {
    name: 'League 4',
    subText: 'Just a basic description',
    id: '4',
    numMinPlayers: 2,
    numMaxPlayers: 3,
    scoring: 'No Points Per Reception',
    totalTeams: 20,
    numTeams: 10,
  },
];

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

function leagues() {
  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setSearchTerm(event.target.value);
    //  when this changes I can search the database here for public leagues that have a name similar to this.
  };
  const [searchTerm, setSearchTerm] = useState('');

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
