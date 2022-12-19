/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Avatar, Button, List, Modal } from '@mantine/core';
import { mapPositionToTable } from '@services/helpers';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export default function PlayerPopup({ player, opened, onClose }) {
  const currentWeek = useSelector((state: StoreState) => state.global.week);
  // const totalWeeks = useSelector((state: StoreState) => state.global.totalWeeks);

  console.log(player);

  const getPlayerOutlook = (player) => {
    if (!player) return <></>;
    const game = player.player_game_stats.length ? player.player_game_stats.slice(0, 1) : [];
    const projection = mapPositionToTable(player, game);
    const outlook = <div> Player outlook and news </div>;

    return (
      <div>
        {projection}
        {outlook}
      </div>
    );
  };

  const getPlayerGameLogs = (player) => {
    if (!player) return <></>;
    return mapPositionToTable(player, player.player_game_stats);
  };

  const getPlayerOwner = (player) => {
    const currentRoster = player.roster_players.find((rp) => rp.roster.week === currentWeek);

    return currentRoster ? currentRoster.team.name : 'FA';
  };

  const playerContent = (player) => {
    if (!player) return <></>;

    return (
      <div>
        <List>
          <List.Item>
            <Avatar src={player.photo_url} alt={'player image'} />
          </List.Item>
          <List.Item>{`${player.first_name} ${player.last_name}`}</List.Item>
          <List.Item>{`${player.current_nfl_team.city} ${player.current_nfl_team.name}`}</List.Item>
          <List.Item>{player.position}</List.Item>
          <List.Item>{getPlayerOwner(player)}</List.Item>
          <List.Item>{player.status}</List.Item>
        </List>
        <Button>{getButtonAction(player)}</Button>
      </div>
    );
  };

  const getButtonAction = (player) => {
    return 'Add Player';
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        // title={playerTitle(player)}
        withCloseButton={false}
        size={'75%'}
      >
        {playerContent(player)}
        Outlook
        {getPlayerOutlook(player)}
        Game Logs
        {getPlayerGameLogs(player)}
      </Modal>
    </>
  );
}
