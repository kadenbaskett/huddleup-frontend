import { Team } from '@interfaces/league.interface';
import { Button, CopyButton, Grid, TextInput } from '@mantine/core';
import React, { useState } from 'react';

export interface InviteCardProps {
  userTeam: Team;
}

export default function InviteCard(props: InviteCardProps) {
  const [email, setEmail] = useState<string>('');

  return (
    <>
      <div className='bg-white rounded-xl border border-white transition-all ease-in duration-200 hover:drop-shadow-md'>
        <div className='pl-3 pr-3 pt-2 font-OpenSans font-bold'>Invite Teammates!</div>
        <Grid className='pl-3 pr-3 pt-5 font-OpenSans font-bold'>
          <Grid.Col>
            <TextInput
              placeholder={props.userTeam.token.toString()}
              size='md'
              label={'Invite Token:'}
              disabled
              variant='filled'
            />
            <CopyButton value={props.userTeam.token.toString()}>
              {({ copied, copy }) => (
                <Button
                  onClick={copy}
                  className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 '
                  variant='default'
                  size='md'
                >
                  Copy Token
                </Button>
              )}
            </CopyButton>
          </Grid.Col>
          <Grid.Col className='pl-3 pr-10 pt-10 pb-10 '>
            <TextInput
              placeholder={'https://huddleupfantasy.com/leagues/11/create/6fSb27j'}
              size='md'
              label={'Invite Link:'}
              disabled
              variant='filled'
            />
            <CopyButton value={'https://huddleupfantasy.com/leagues/11/create/6fSb27j'}>
              {({ copied, copy }) => (
                <Button
                  onClick={copy}
                  className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 '
                  variant='default'
                  size='md'
                >
                  Copy Link
                </Button>
              )}
            </CopyButton>
          </Grid.Col>
          <Grid.Col className='pl-3 pr-10 pt-10 pb-10'>
            <TextInput
              placeholder={'myemail@email.com'}
              size='md'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={'Invite Through Email:'}
              variant='filled'
            />
            <Button
              className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 '
              variant='default'
              size='md'
            >
              Send Email
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
}
