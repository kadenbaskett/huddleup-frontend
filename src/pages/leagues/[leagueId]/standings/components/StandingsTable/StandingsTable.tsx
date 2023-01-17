import { Table } from '@mantine/core';
import { Team } from '@pages/leagues/[leagueId]/home/overview/types';
import React from 'react';

export interface StandingsTableProps {
  teams: Team[]; // this is the same teams that is in my overview page. Should we have a global types folder for this kind of thing?
}

export default function StandingsTable(props: StandingsTableProps) {
  const rows = props.teams.map((p: Team) => (
    <tr key={p.id.toString()}>
      <td className='font-bold'>{p.rank.toString()}.</td>
      <td className='font-varsity text-2xl'>{p.name}</td>
      {/* These will ideally link to the specific teams page */}
      <td className='text-orange'>{p.managers}</td>
      {/* These will ideally link to the specific persons page (stretch feature) */}
      <td className='font-bold'>{p.wins.toString()}</td>
      <td className='font-bold'>{p.losses.toString()}</td>
      <td className='font-bold'>0</td>
    </tr>
  ));
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
        Standings
      </div>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Managers</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
