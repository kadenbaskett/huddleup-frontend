import React, { useState } from 'react';
import { Team } from '@interfaces/league.interface';
import { Avatar, Table } from '@mantine/core';
import Link from 'next/link';
import { fantasyPoints } from '@services/helpers';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';

export interface RosterCardProps {
  team: Team;
  leagueID: number;
  week: number;
}

const calculatePoints = (playerGameStats, week: number) => {
  const currentWeekStats = playerGameStats.find((pgs) => pgs.game?.week === week);
  const numPoints = fantasyPoints(currentWeekStats);
  return numPoints;
};

export function RosterCard(props: RosterCardProps) {
  const [playerPopupOpen, setPlayerPopupOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(null);

  const onPlayerPopupClose = () => {
    setPlayerPopupOpen(false);
    setOpenPlayer(null);
  };

  const onPlayerClick = (evt, p) => {
    event.preventDefault();
    setOpenPlayer(p);
    setPlayerPopupOpen(true);
  };
  const currPlayers = props.team.rosters[props.team.rosters.length - 1].players;
  const rows = currPlayers.map((player) => (
    <tr key={player.id.toString()}>
      <td className='font-bold'>{player.position}</td>
      <td>
        <div className='font-varsity text-sm inline-flex leading-4'>
          <div>
            <Avatar src={player.player.photo_url} alt={'player image'} />
          </div>
          <div className='text-center'>
            <a href='#' onClick={(evt) => onPlayerClick(evt, player.player)}>
              {player.player.first_name}
              <br /> {player.player.last_name}
            </a>
          </div>
        </div>
      </td>
      <td>{calculatePoints(player.player.player_game_stats, props.week)}</td>
    </tr>
  ));

  return (
    <div className='pl-3 pt-2 w-full h-full'>
      <div className='bg-white rounded-xl hover:drop-shadow-md'>
        <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
          <Link href={`/leagues/${props.leagueID}/team/${props.team.id}`}>{props.team.name} </Link>(
          {props.team.wins} - {props.team.losses} - {0} )
        </div>
        <Table highlightOnHover withBorder striped className='rounded-xl'>
          <thead>
            <tr>
              <th>Slot</th>
              <th>Player</th>
              <th>Weekly Points</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
      <PlayerPopup player={openPlayer} opened={playerPopupOpen} onClose={onPlayerPopupClose} />
    </div>
  );
}
