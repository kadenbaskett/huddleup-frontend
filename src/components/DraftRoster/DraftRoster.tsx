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
  const allPlayers = store.league.playerList;
  const draftPlayers = store.draft.draftPlayers;

  const [token, setToken] = useState(userTeam.token);

  const myRosterID = draftPlayers
    .filter((draftPlayer) => draftPlayer.team_id === userTeam.id)
    .map((player) => player.player_id);
  const myPlayers = allPlayers.filter((player) => myRosterID.includes(player.id));

  const [viewRoster, setViewRoster] = useState(myPlayers);

  const setRoster = (e) => {
    setToken(e);
    const currTeam = league.teams.find((team) => team.token === e);
    const currRosterID = draftPlayers
      .filter((draftPlayer) => draftPlayer.team_id === currTeam.id)
      .map((player) => player.player_id);
    const getPlayers = allPlayers.filter((player) => currRosterID.includes(player.id));
    setViewRoster(getPlayers);
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
                    <Avatar src={p.photo_url} alt={'player image'} />
                    <div className='text-darkBlue font-bold text-xl'>
                      {p.first_name} {p.last_name}
                      <div className='text-orange font-thin text-sm'>
                        {p.position} | {p.current_nfl_team ? p.current_nfl_team.name : ''}
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
