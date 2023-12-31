import { Anchor, Table } from '@mantine/core';
import { StoreState } from '@store/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { Team } from '@interfaces/types.interface';

export interface Top5StandingTableProps {
  teams: Team[];
}

export default function Top5StandingTable(props: Top5StandingTableProps) {
  const league = useSelector((state: StoreState) => state.league.league);
  const leagueId: number = league.id;

  let i = 0;
  const rows = props.teams.map(({ id, name, wins, losses }) => (
    <tr key={id.toString()}>
      <td>{++i}</td>
      <td>
        <Link href={'/leagues/' + leagueId.toString() + '/team/' + id.toString()}>{name}</Link>
      </td>
      <td>{wins.toString()}</td>
      <td>{losses.toString()}</td>
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
