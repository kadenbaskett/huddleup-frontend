import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Button, Group, TextInput } from '@mantine/core';
import { createTeam } from '@services/apiClient';
import { userSliceState } from '@store/slices/userSlice';
import { StoreState } from '@store/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function index() {
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const user: userSliceState = useSelector((state: StoreState) => state.user);

  const [teamName, setTeamName] = useState<string>('');

  const router = useRouter();

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(async () => {
    const team = {
      leagueId: league.id,
      teamOwnerId: user.userInfo.id,
      teamName,
    };
    const newTeam = await createTeam(team);
    console.log('newTeam', newTeam);
    await router.push({
      pathname: `/leagues/${Number(league.id)}/join/team/${Number(newTeam.data.id)}`,
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <>
        {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
        {leagueInfoFetchStatus === 'succeeded' && (
          <div className='bg-lightGrey p-10 min-h-screen gap-10'>
            <div className='pt-4 pb-4'>
              <label className='font-varsity text-6xl'>Create Your Team</label>
            </div>
            <div className='pt-4 pb-4'>
              <label className='font-OpenSans font-bold text-2xl'>Team Name:</label>
              <TextInput
                placeholder='Sample Team Name'
                size='xl'
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                styles={() => ({
                  input: {
                    fontFamily: 'Varsity Team',
                    color: '#ff6b00',
                    fontSize: '3rem',
                  },
                })}
              />
            </div>

            <div className='pt-4 pb-4'>
              <label className='font-OpenSans font-bold text-2xl'>Select Team Icon:</label>
              <br />
              <div className='pt-4 pb-4'>
                <Button
                  className='hover:bg-darkBlue hover:text-white text-xl font-bold hover:border hover:border-darkBlue rounded bg-white text-darkBlue border-transparent transition ease-in duration-200'
                  variant='default'
                  size='md'
                >
                  Select
                </Button>
              </div>
            </div>

            <Group position='center'>
              <Link href='/leagues/join'>
                <Button
                  className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange rounded bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  size='xl'
                >
                  Cancel
                </Button>
              </Link>
              <Button
                className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='xl'
                formMethod='POST'
                type='submit'
              >
                Create Team
              </Button>
            </Group>
          </div>
        )}
      </>
    </form>
  );
}
