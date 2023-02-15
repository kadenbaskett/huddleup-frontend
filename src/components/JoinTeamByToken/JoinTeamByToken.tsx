import { Button, Group, Modal, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import router from 'next/router';
import { userSliceState } from '@store/slices/userSlice';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';
import { userToTeam } from '@services/apiClient';
import { findTeamByToken } from '@services/helpers';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

export interface JoinTeamByTokenProps {
  opened: boolean;
  closed: any;
  tokens: string[];
}

export default function JoinTeamByToken(props: JoinTeamByTokenProps) {
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const userInfoFetchStatus: String = useSelector((state: StoreState) => state.user.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const user: userSliceState = useSelector((state: StoreState) => state.user);

  const [token, setToken] = useState('');
  const [validToken, setValidToken] = useState(true);

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(async () => {
    const newUserToTeam = {
      user,
      team: findTeamByToken(league, token),
    };

    await userToTeam(newUserToTeam);
    await router.push({
      pathname: `/leagues/${Number(league.id)}/create/${token}`,
    });
  });

  const checkToken = (currToken: string) => {
    setToken(currToken);
    props.tokens.includes(currToken) ? setValidToken(false) : setValidToken(true);
  };
  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && userInfoFetchStatus !== 'succeeded' && (
        <HuddleUpLoader />
      )}
      {leagueInfoFetchStatus === 'succeeded' && userInfoFetchStatus === 'succeeded' && (
        <Modal
          opened={props.opened}
          onClose={() => props.closed()}
          withCloseButton={false}
          centered
        >
          <div className='p-4 font-varsity flex justify-center text-2xl text-darkBlue rounded-t-xl'>
            Join Team With Token
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-center'>
              <Group>
                <TextInput
                  value={token}
                  onChange={(event) => checkToken(event.currentTarget.value)}
                  autoFocus
                  placeholder='Team Token'
                />

                <Button
                  className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  size='sm'
                  formMethod='POST'
                  type='submit'
                  disabled={validToken}
                >
                  Join
                </Button>
              </Group>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
