import React from 'react';
import { Team } from '@interfaces/league.interface';
import { Avatar, Table } from '@mantine/core';
import Link from 'next/link';

export interface RosterCardProps {
  team: Team;
  leagueID: number;
}

export function RosterCard(props: RosterCardProps) {
  const currPlayers = props.team.rosters[props.team.rosters.length - 1].players;
  const rows = currPlayers.map((player) => (
    <tr key={player.id.toString()}>
      <td className='font-bold'>{player.position}</td>
      <td className='font-varsity text-3xl'>
        <Avatar src={player.player.photo_url} alt={'player image'} />
        {player.player.first_name} {player.player.last_name}
      </td>
    </tr>
  ));

  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
        <Link href={`/leagues/${props.leagueID}/team/${props.team.id}`}>{props.team.name}</Link>(
        {props.team.wins} - {props.team.losses} - {0} )
      </div>
      <Table>
        <thead>
          <tr>
            <th>Slot</th>
            <th>Player</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}
