import { Select, Group, Avatar } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react';

export interface TeamData {
  value: string;
  label: string;
}

export interface DraftRosterProps {
  teams: any[];
  teamData: TeamData[];
  myTeam: any;
}

export default function DraftRoster(props: DraftRosterProps) {
  const [token, setToken] = useState(props.myTeam?.token);

  const [viewRoster, setViewRoster] = useState(props?.myTeam);

  const setRoster = (e) => {
    setToken(e);
    setViewRoster(props.teams.find((team) => team.token === e));
  };

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
          records={viewRoster.rosters[0].players}
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
        />
      </div>
    </>
  );
}
