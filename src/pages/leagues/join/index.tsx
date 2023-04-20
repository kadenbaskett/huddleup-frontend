import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { League } from '@interfaces/league.interface';
import { Button, TextInput } from '@mantine/core';
import { userSliceState } from '@store/slices/userSlice';
import { StoreState } from '@store/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { JoinLeagueCard } from '@components/JoinLeagueCard/JoinLeagueCard';
import JoinLeagueByToken from '@components/JoinLeagueByToken/JoinLeagueByToken';

function leagues() {
  const store = useSelector((state: StoreState) => state);
  const globalStatus = store.global.status;
  const publicLeagues = store.global.publicLeagues;
  const privateLeagues = store.global.privateLeagues;
  const userInfoFetchStatus = store.user.status;
  const user: userSliceState = store.user;
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [JoinLeagueByTokenPopUp, setJoinLeagueByTokenPopUp] = useState(false);

  const leagueTokens: string[] = [];
  privateLeagues?.forEach((league) => leagueTokens.push(league.token));
  results.forEach((league) => {
    leagueTokens.push(league.token);
  });

  const onJoinLeagueByTokenClick = (event) => {
    event.preventDefault();
    setJoinLeagueByTokenPopUp(true);
  };

  const onJoinLeagueByTokenClose = () => {
    setJoinLeagueByTokenPopUp(false);
  };

  useEffect(() => {
    if (userInfoFetchStatus === 'succeeded') {
      const leagueIds: number[] = [];
      user.leagues.forEach((league) => {
        leagueIds.push(league.id);
      });
      setResults(
        publicLeagues.filter((league) => {
          // if the user is in the league dont show
          if (leagueIds.includes(league.id)) return false;

          // if the league has all teams dont show
          if (league.settings.num_teams === league.teams.length) return false;

          // filter on what they are typing
          const leagueName = `${league.name}`;
          for (const word of searchTerm.toString().split(' ')) {
            if (leagueName.toLowerCase().includes(word.toLowerCase())) return true;
          }
          return false;
        }),
      );
    }
  }, [searchTerm]);

  const renderLeague = (league: League) => {
    return (
      <div className='grid col-span-10 pb-2'>
        <JoinLeagueCard league={league} userId={user.userInfo.id} />
      </div>
    );
  };

  /*
   * Start of Join a League Page
   */
  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && globalStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && globalStatus === 'succeeded' && (
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
                onClick={(evt) => onJoinLeagueByTokenClick(evt)}
              >
                Find Private League By Token
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
                    '&:focus-within': {
                      borderColor: '#ff6b00',
                    },
                  },
                })}
              />
              <div className='pt-5'>{results.map((league) => renderLeague(league))}</div>
            </div>
          </div>

          <JoinLeagueByToken
            opened={JoinLeagueByTokenPopUp}
            closed={onJoinLeagueByTokenClose}
            tokens={leagueTokens}
          />
        </div>
      )}
    </>
  );
}

export default leagues;
