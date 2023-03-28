import { DraftPlayer } from '@interfaces/draft.interface';
import { Avatar, Group, Stack } from '@mantine/core';
import { StoreState } from '@store/store';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useSelector } from 'react-redux';

export interface ShowPlayers {
  player: any;
  draftPlayer: DraftPlayer;
}

export default function DraftHistory() {
  const allPlayers = useSelector((state: StoreState) => state.league.playerList);
  const draftPlayers = useSelector((state: StoreState) => state.draft.draftPlayers);
  const league = useSelector((state: StoreState) => state.league.league);
  const showPlayers: ShowPlayers[] = [];
  draftPlayers.forEach((player2) => {
    showPlayers.push({
      player: allPlayers.find((player) => player.id === player2.player_id),
      draftPlayer: player2,
    });
  });
  showPlayers.reverse();
  return (
    <>
      <div className='bg-white rounded-xl hover:drop-shadow-md'>
        <div className='p-5 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
          History
        </div>
        <div className='hover:shadow-inner-xl p-5'>
          <DataTable
            className='bg-white rounded-xl hover:drop-shadow-md'
            withBorder
            highlightOnHover
            striped
            withColumnBorders
            records={showPlayers}
            emptyState={
              <div className='p-5'>
                <Stack align='center' spacing='md'>
                  No picks have been made yet
                </Stack>
              </div>
            }
            columns={[
              {
                accessor: 'id',
                title: 'Player',
                render: (p) => (
                  <Group>
                    <Avatar src={p.player.photo_url} alt={'player image'} />
                    <div className='text-darkBlue font-bold text-xl'>
                      {p.player.first_name} {p.player.last_name}
                      <div className='text-orange font-thin text-sm'>
                        Picked by{' '}
                        {league.teams.find((team) => team.id === p.draftPlayer.team_id).name} as the{' '}
                        {p.draftPlayer.pick_number} pick
                      </div>
                    </div>
                  </Group>
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
