import { Group, Avatar, Button, SegmentedControl, TextInput } from '@mantine/core';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
import { StoreState } from '@store/store';
import CONFIG from '@services/config';
import { useForm } from '@mantine/form';
import { sortBy } from 'lodash';
import { useSelector } from 'react-redux';

export default function DraftPlayerTable({ playersChosen }) {
  const allPlayers = useSelector((state: StoreState) => state.league.playerList);

  // Player filtering
  const form = useForm({
    initialValues: {
      player: '',
      position: 'All',
    },
  });

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'currentWeekProj',
    direction: 'desc',
  });
  const [records, setRecords] = useState(sortBy(allPlayers, 'currentWeekProj'));

  useEffect(() => {
    if (allPlayers) {
      const data = sortBy(filterPlayers(), sortStatus.columnAccessor);
      setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }
  }, [sortStatus, allPlayers, form.values, playersChosen]);

  const filterPlayers = () => {
    let players = allPlayers;

    const position = form.values.position;

    if (position === 'FLEX') {
      players = players.filter((player) => CONFIG.flexPositions.includes(player.position));
    } else if (position !== 'All') {
      players = players.filter((player) => player.position === position);
    }

    if (playersChosen) {
      players.filter((player) => !playersChosen.includes(player));
      console.log('playersChosen', playersChosen);
    }
    const playerSearchName = form.values.player;

    if (playerSearchName !== '') {
      const words = playerSearchName.split(' ');

      players = players.filter((player) => {
        const fullName = `${String(player.first_name)}${String(player.last_name)}`;

        for (const word of words) {
          if (fullName.toLowerCase().includes(word.toLowerCase())) return true;
        }
        return false;
      });
    }

    // Only display first 50 results
    players = players.slice(0, 50);

    return players;
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <div className='bg-white rounded-xl hover:drop-shadow-md'>
          <div className='p-5 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
            Filters
          </div>
          <div className='pr-4 pl-4 pt-2'>
            <div className='text-md font-varsity text-darkBlue'>Position:</div>
            <SegmentedControl
              color='orange'
              fullWidth
              transitionDuration={400}
              transitionTimingFunction='linear'
              data={[
                { label: 'All', value: 'All' },
                { label: 'QB', value: 'QB' },
                { label: 'RB', value: 'RB' },
                { label: 'WR', value: 'WR' },
                { label: 'TE', value: 'TE' },
                { label: 'FLEX', value: 'FLEX' },
              ]}
              {...form.getInputProps('position')}
            />
          </div>
          <div className='pr-4 pl-4 pt-2 pb-4'>
            <div className='text-md font-varsity text-darkBlue'>Player Name:</div>
            <TextInput placeholder='Justin Jefferson' {...form.getInputProps('player')} />
          </div>
        </div>
      </form>
      <div className='pt-4'>
        <DataTable
          className='bg-white rounded-xl hover:drop-shadow-md'
          withBorder
          highlightOnHover
          striped
          withColumnBorders
          records={records}
          columns={[
            {
              accessor: 'id',
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
              accessor: 'external_id',
              title: 'Draft or Queue',
              render: () => (
                <Group>
                  <Button
                    className={`${'bg-transparent hover:bg-green text-green hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-green rounded border-green transition ease-in duration-200`}
                  >
                    {'Draft'}
                  </Button>
                  <Button
                    className={`${'bg-transparent hover:bg-orange text-orange hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-orange rounded border-orange transition ease-in duration-200`}
                  >
                    {'Queue'}
                  </Button>
                </Group>
              ),
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
        />
      </div>
    </>
  );
}
