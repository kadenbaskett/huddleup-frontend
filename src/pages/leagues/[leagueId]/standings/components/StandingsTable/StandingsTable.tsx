import { Table } from '@mantine/core';
import React from 'react';

export default function StandingsTable(props) {
  const rows = props.teams.map(({ id, name, managers }) => (
    <tr key={id.toString()}>
      <td className='font-bold'>{1}.</td>
      <td className='font-varsity text-2xl'>{name}</td>
      {/* These will ideally link to the specific teams page */}
      <td className='text-orange'>
        {managers
          .map((m) => {
            return m.user.username;
          })
          .join(', ')}
      </td>
      {/* These will ideally link to the specific persons page (stretch feature) */}
      <td className='font-bold'>{0}</td>
      <td className='font-bold'>{0}</td>
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
