import { Group, Avatar, Button } from '@mantine/core';
import { StoreState } from '@store/store';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useSelector } from 'react-redux';

function DraftPlayerTable() {
  const allPlayers = useSelector((state: StoreState) => state.league.playerList);

  return (
    <>
      <DataTable
        className='bg-white rounded-xl hover:drop-shadow-md'
        withBorder
        highlightOnHover
        striped
        withColumnBorders
        records={allPlayers}
        columns={[
          {
            accessor: 'first_name',
            title: 'Player',
            render: (p) => (
              <Group>
                <Avatar src={p.photo_url} alt={'player image'} />
                {p.first_name} {p.last_name}
                {'\n'}
                {p.position}
                {'\n'}
                {p.current_nfl_team ? p.current_nfl_team.key : ''}
              </Group>
            ),
          },
          {
            accessor: 'first_name',
            title: 'Draft',
            render: (p) => (
              <Group>
                <Button
                  className={`${'bg-transparent hover:bg-green text-green hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-green rounded border-green transition ease-in duration-200`}
                >
                  {'Draft'}
                </Button>
              </Group>
            ),
          },
        ]}
      />
    </>
  );
}

export default DraftPlayerTable;
