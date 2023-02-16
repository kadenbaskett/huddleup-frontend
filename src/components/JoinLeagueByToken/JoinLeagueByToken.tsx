import { Button, Group, Modal, TextInput } from '@mantine/core';
import { findLeagueByToken } from '@services/helpers';
import { StoreState } from '@store/store';
import router from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export interface JoinLeagueByTokenProps {
  opened: boolean;
  closed: any;
  tokens: string[];
}

export default function JoinLeagueByToken(props: JoinLeagueByTokenProps) {
  const privateLeagues = useSelector((state: StoreState) => state.global.privateLeagues);

  const [token, setToken] = useState('');
  const [validToken, setValidToken] = useState(true);

  const checkToken = (currToken: string) => {
    setToken(currToken);
    props.tokens.includes(currToken) ? setValidToken(false) : setValidToken(true);
  };

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(async () => {
    await router.push({
      pathname: `/leagues/${Number(await findLeagueByToken(privateLeagues, token))}/create/`,
    });
  });

  return (
    <>
      <Modal opened={props.opened} onClose={() => props.closed()} withCloseButton={false} centered>
        <div className='p-4 font-varsity flex justify-center text-xl text-darkBlue rounded-t-xl'>
          Find Private League With Token
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center'>
            <Group>
              <TextInput
                value={token}
                onChange={(event) => checkToken(event.currentTarget.value)}
                autoFocus
                placeholder='League Token'
              />

              <Button
                className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='sm'
                type='submit'
                disabled={validToken}
              >
                Join
              </Button>
            </Group>
          </div>
        </form>
      </Modal>
    </>
  );
}
