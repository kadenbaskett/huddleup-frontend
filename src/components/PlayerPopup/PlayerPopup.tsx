/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Avatar, Button, Text, Modal, Grid } from '@mantine/core';
import { getTeamThatOwnsPlayer, mapPositionToTable } from '@services/helpers';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export default function PlayerPopup({ player, opened, onClose, onPlayerAction }) {
  const currentWeek = useSelector((state: StoreState) => state.global.week);
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);

  const getPlayerOutlook = (player) => {
    if (!player) return <div></div>;
    const game = player.player_projections.length
      ? player.player_projections.find((pgs) => pgs.game.week === currentWeek)
      : [];
    const projection = mapPositionToTable(player, [game]);

    return (
      <div>
        {`Week ${currentWeek} projection`}
        {projection}
      </div>
    );
  };

  const getPlayerGameLogs = (player) => {
    if (!player) return <></>;
    const table = mapPositionToTable(player, player.player_game_stats);
    return (
      <div>
        {'Game Logs'}
        {table}
      </div>
    );
  };

  const playerButtonClicked = () => {
    onPlayerAction(player);
    onClose();
  };

  const getActionButton = () => {
    const team = getTeamThatOwnsPlayer(player, currentWeek);

    if (!team) {
      return (
        <Button
          onClick={playerButtonClicked}
          className={`${'bg-red text-white hover:text-we'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
        >
          {'Add'}
        </Button>
      );
    } else if (team.id === userTeam.id) {
      return (
        <Button
          onClick={playerButtonClicked}
          className={`${'bg-red text-white hover:text-we'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
        >
          {'Drop'}
        </Button>
      );
    } else {
      return (
        <Button
          onClick={playerButtonClicked}
          className={`${'bg-red text-white hover:text-we'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
        >
          {'Trade'}
        </Button>
      );
    }
  };

  const playerContent = (player) => {
    if (!player) return <></>;

    const team = getTeamThatOwnsPlayer(player, currentWeek);

    return (
      <div>
        <Text>
          {player.current_nfl_team.city} | {player.current_nfl_team.name} | {player.position} |{' '}
          {player.status}
        </Text>
        <Text>{`Owner: ${team ? team.name : 'Free Agent'}`}</Text>
        {getActionButton()}
      </div>
    );
  };

  const renderTitle = () => {
    return (
      <Grid>
        <Avatar src={player?.photo_url} alt={'player image'} size={'md'} />
        <Text>
          {player?.first_name} {player?.last_name}
        </Text>
      </Grid>
    );
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title={renderTitle()}
        withCloseButton={true}
        size={'75%'}
      >
        {playerContent(player)}
        {getPlayerOutlook(player)}
        {getPlayerGameLogs(player)}
      </Modal>
    </>
  );
}
