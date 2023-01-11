import { Anchor, Table } from '@mantine/core';
import { StoreState } from '@store/store';
import router from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { Team } from '../../types';

export interface Top5StandingTableProps {
  teams: Team[];
}

export default function Top5StandingTable(props: Top5StandingTableProps) {
  const { leagueId } = router.query;
  const league = useSelector((state: StoreState) => state.league.league);
  const rows = props.teams.map((p: Team) => (
    <tr key={p.id.toString()}>
      <td>{p.rank.toString()}</td>
      <td>{p.name}</td>
      <td>{p.wins.toString()}</td>
      <td>{p.losses.toString()}</td>
    </tr>
  ));
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <Anchor href={'/leagues/' + String(leagueId) + '/standings'} variant='text'>
        <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
          Top 5 in {league ? league.name : ' '}
        </div>
      </Anchor>
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
