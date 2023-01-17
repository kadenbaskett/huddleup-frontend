import { Table } from '@mantine/core';
import { StoreState } from '@store/store';
import Link from 'next/link';
import router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

export interface Top5StandingTableProps {
  teams: any[];
}

export default function Top5StandingTable(props: Top5StandingTableProps) {
  const { leagueId } = router.query;
  const league = useSelector((state: StoreState) => state.league.league);
  const rows = props.teams.map(({ id, name }) => (
    <tr key={id.toString()}>
      <td>{0}</td>
      <td>{name}</td>
      <td>{0}</td>
      <td>{0}</td>
    </tr>
  ));
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <Link href={'/leagues/' + String(leagueId) + '/standings'}>
        <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
          Top 5 in {league ? league.name : ' '}
        </div>
      </Link>
      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
