import { Select, Group, Avatar, Stack } from '@mantine/core';
import { StoreState } from '@store/store';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export interface TeamData {
  value: string;
  label: string;
}

export interface DraftRosterProps {
  teamData: TeamData[];
}

export default function DraftRoster(props: DraftRosterProps) {
  const store = useSelector((state: StoreState) => state);
  const league = store.league.league;
  const userTeam = store.league.userTeam;

  const [token, setToken] = useState(userTeam.token);

  const [viewRoster, setViewRoster] = useState(userTeam.rosters[0].players);

  const setRoster = (e) => {
    setToken(e);
    const currTeam = league.teams.find((team) => team.token === e);
    setViewRoster(currTeam.rosters[0].players);
  };

  useEffect(() => {
    setRoster(token);
  }, [league]);

  return (
    <>
      <div className='pb-4'>
        <Select
          id='rosterSelecter'
          value={token}
          onChange={(e) => setRoster(e)}
          data={props.teamData}
        />
      </div>

      <div className='hover:shadow-inner-xl'>
        <DataTable
          className='bg-white rounded-xl hover:drop-shadow-md'
          withBorder
          highlightOnHover
          striped
          withColumnBorders
          records={viewRoster}
          columns={[
            {
              accessor: 'Players',
              render: (p) => (
                <>
                  <Group>
                    <Avatar src={p.player.photo_url} alt={'player image'} />
                    <div className='text-darkBlue font-bold text-xl'>
                      {p.player.first_name} {p.player.last_name}
                      <div className='text-orange font-thin text-sm'>
                        {p.player.position} |{' '}
                        {p.player.current_nfl_team ? p.player.current_nfl_team.name : ''}
                      </div>
                    </div>
                  </Group>
                </>
              ),
            },
          ]}
          emptyState={
            <div className='p-5'>
              <Stack align='center' spacing='md'>
                No players on team yet
              </Stack>
            </div>
          }
        />
      </div>
    </>
  );
}
