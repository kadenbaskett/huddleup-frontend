import React, { useState } from 'react';
import { Team } from '@interfaces/league.interface';
import { Avatar, Table } from '@mantine/core';
import Link from 'next/link';
import { fantasyPoints, getTeamThatOwnsPlayer } from '@services/helpers';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import AddDropPlayerConfirmPopup from '@components/AddDropPlayerConfirmPopup/AddDropPlayerConfirmPopup';
import AddDropPlayerPopup from '@components/AddDropPlayerPopup/AddDropPlayerPopup';
import TradePlayerPopup from '@components/TradePlayerPopup/TradePlayerPopup';
import CONFIG from '@services/config';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';

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
  // Application state
  const league = useSelector((state: StoreState) => state.league.league);
  const myTeam = useSelector((state: StoreState) => state.league.userTeam);
  const currentWeek = useSelector((state: StoreState) => state.global.week);
  const user = useSelector((state: StoreState) => state.user.userInfo);

  // Trade popup
  const [tradePopupOpen, setTradePopupOpen] = useState(false);
  const [tradeRoster, setTradeRoster] = useState(null);

  // Are we adding or dropping the player?
  const [addingPlayer, setAddingPlayer] = useState(false);

  // Confirm popup
  const [addDropConfirmPopupOpen, setAddDropConfirmPopupOpen] = useState(false);

  // Add Drop popup
  const [addDropPopupOpen, setAddDropPopupOpen] = useState(false);

  // Player popup
  const [playerPopupOpen, setPlayerPopupOpen] = useState(false);

  // Used for all popups
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // On close methods of popups
  const onTradePopupClose = () => {
    setTradePopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropPopupClose = () => {
    setAddDropPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropConfirmClose = () => {
    setAddDropConfirmPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onPlayerPopupClose = () => {
    setPlayerPopupOpen(false);
  };

  // When a player is clicked
  const onPlayerClick = (event, p) => {
    event.preventDefault();
    setSelectedPlayer(p);
    setPlayerPopupOpen(true);
  };

  // Takes the necessary action to add/drop/trade for player
  const takePlayerAction = (player) => {
    setSelectedPlayer(player);

    const playerTeam = getTeamThatOwnsPlayer(player, currentWeek, league.id);
    const myRoster = getMyRoster();
    const isMyPlayer = playerTeam?.id === myTeam.id;

    // Nobody owns the player -> they are a free agent
    if (!playerTeam) {
      // TODO use league settings instead of CONFIG
      // No need to drop a player as part of the transaction if your roster isn't full
      if (myRoster.players.length < CONFIG.maxRosterSize) {
        setAddingPlayer(true);
        setAddDropConfirmPopupOpen(true);
      } else {
        setAddDropPopupOpen(true);
      }
    }
    // I own the player - so drop them
    else if (isMyPlayer) {
      setAddingPlayer(false);
      setAddDropConfirmPopupOpen(true);
    }
    // Another team owns this player - so propose a trade
    else {
      const tradeTeam = league.teams.find((t) => t.id === playerTeam.id);
      const tradeRoster = tradeTeam.rosters.find((r) => r.week === currentWeek);

      setTradeRoster(tradeRoster);
      setTradePopupOpen(true);
    }
  };

  const getMyRoster = () => {
    return myTeam ? myTeam.rosters.find((r) => r.week === currentWeek) : [];
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
      <PlayerPopup
        player={selectedPlayer}
        opened={playerPopupOpen}
        onClose={onPlayerPopupClose}
        onPlayerAction={takePlayerAction}
        leagueId={props.leagueID}
      />
      <AddDropPlayerPopup
        roster={getMyRoster()}
        player={selectedPlayer}
        opened={addDropPopupOpen}
        onClose={onAddDropPopupClose}
        userId={user.id}
      />
      <TradePlayerPopup
        otherRoster={tradeRoster}
        myRoster={getMyRoster()}
        player={selectedPlayer}
        opened={tradePopupOpen}
        onClose={onTradePopupClose}
        userId={user.id}
        week={currentWeek}
      />
      <AddDropPlayerConfirmPopup
        roster={getMyRoster()}
        isAdd={addingPlayer}
        player={selectedPlayer}
        opened={addDropConfirmPopupOpen}
        onClose={onAddDropConfirmClose}
        userId={user.id}
      />
    </div>
  );
}
