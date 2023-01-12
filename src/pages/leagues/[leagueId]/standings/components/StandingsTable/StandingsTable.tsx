import { Table } from '@mantine/core';
import { Team } from '@pages/leagues/[leagueId]/home/overview/types';
import React from 'react';

export interface StandingsTableProps {
  teams: Team[]; // this is the same teams that is in my overview page. Should we have a global types folder for this kind of thing?
}

export default function StandingsTable() {
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
        Standings
      </div>
      <Table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Managers</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
}
