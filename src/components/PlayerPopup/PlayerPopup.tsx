/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { Avatar, Button, Modal, Space } from '@mantine/core';
import { getTeamThatOwnsPlayer, mapPositionToTable } from '@services/helpers';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export default function PlayerPopup({ player, opened, onClose, onPlayerAction, leagueId }) {
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
        {`Week ${currentWeek} projection: `}
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
    if (onPlayerAction === null) {
      return;
    }
    const team = getTeamThatOwnsPlayer(player, currentWeek, leagueId);

    if (!team) {
      return (
        <Button
          onClick={playerButtonClicked}
          className={`${'bg-transparent hover:bg-green text-green hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-green rounded border-green transition ease-in duration-200`}
        >
          {'Add'}
        </Button>
      );
    } else if (team.id === userTeam.id) {
      return (
        <Button
          onClick={playerButtonClicked}
          className={`${'bg-transparent hover:bg-red text-red hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
        >
          {'Drop'}
        </Button>
      );
    } else {
      return (
        <Button
          onClick={playerButtonClicked}
          className={`${'bg-transparent hover:bg-green text-green hover:text-white'} hover:cursor-pointer p-4' text-2xl font-bold hover:border hover:border-green rounded border-green transition ease-in duration-200`}
        >
          {'Trade'}
        </Button>
      );
    }
  };

  const renderTitle = () => {
    if (!player) return <></>;

    const team = getTeamThatOwnsPlayer(player, currentWeek, leagueId);

    return (
      <>
        <div className=' flex'>
          <div>
            <Avatar src={player?.photo_url} alt={'player image'} size={'lg'} />
          </div>
          <div className='pl-4'>
            <div className='font-varsity text-darkBlue text-3xl'>
              {player.first_name} {player.last_name}
            </div>
            <div className='font-openSans text-orange'>
              {player.current_nfl_team.name} | {player.position} | {player.status} |{' '}
              {team ? `Owned by: ${team.name}` : 'Free Agent'}
            </div>
          </div>
          <div className='pl-5 pt-1'>
            <div>{getActionButton()}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        withCloseButton={true}
        size={'75%'}
        title={renderTitle()}
        overlayProps={{
          blur: 3,
        }}
      >
        <Space h='md' />
        {getPlayerOutlook(player)}
        <Space h='md' />
        {getPlayerGameLogs(player)}
        <Space h='md' />
      </Modal>
    </>
  );
}
