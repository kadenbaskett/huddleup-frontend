import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Button, CopyButton, Grid, TextInput } from '@mantine/core';
import { StoreState } from '@store/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export interface InviteCardProps {
  league: any;
}

export default function InviteCard(props: InviteCardProps) {
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);

  const [email, setEmail] = useState<string>('');
  const token = props.league.token ? props.league.token : 0;

  const dontShow = false;
  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='bg-white rounded-xl border border-white transition-all ease-in duration-200 hover:drop-shadow-md'>
          <div className='pl-3 pr-3 pt-2 font-OpenSans font-bold'>
            Invite Other People To League!
          </div>
          <Grid className='pl-3 pr-3 pt-5 pb-5 font-OpenSans font-bold'>
            <Grid.Col>
              <TextInput
                placeholder={token}
                size='md'
                label={'Invite Token:'}
                disabled
                variant='filled'
              />
              <CopyButton value={token}>
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
            {dontShow && (
              <Grid.Col className='pl-3 pr-10 pt-10 pb-10 '>
                <TextInput
                  placeholder={`https://huddleupfantasy.com/leagues/${Number(
                    props.league.id,
                  )}/create/${Number(token)}`}
                  size='md'
                  label={'Invite Link:'}
                  disabled
                  variant='filled'
                />
                <CopyButton
                  value={`https://huddleupfantasy.com/${Number(props.league.id)}/11/create/${Number(
                    token,
                  )}`}
                >
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
            )}

            {dontShow && (
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
            )}
          </Grid>
        </div>
      )}
    </>
  );
}
