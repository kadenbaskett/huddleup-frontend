import { Table } from '@mantine/core';
import React from 'react';

export interface StandingsTableProps {
  teams: any[];
  week: number; // this is the same teams that is in my overview page. Should we have a global types folder for this kind of thing?
}

export function managerString(managers) {
  const tempManagerString: string = managers
    .map((m) => {
      return m.user.username;
    })
    .join(', ');
  return tempManagerString;
}

export default function StandingsTable(props: StandingsTableProps) {
  let i = 0;
  const rows = props.teams.map(({ id, managers, name, wins, losses, week }) => (
    <tr key={id.toString()}>
      <td className='font-bold'>{++i}.</td>
      <td className='font-varsity text-3xl'>{name}</td>
      {/* These will ideally link to the specific teams page */}
      <td className='text-orange'>{managerString(managers)}</td>
      {/* These will ideally link to the specific persons page (stretch feature) */}
      <td className='font-bold'>{wins.toString()}</td>
      <td className='font-bold'>{losses.toString()}</td>
      <td className='font-bold'>{0}</td>
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
