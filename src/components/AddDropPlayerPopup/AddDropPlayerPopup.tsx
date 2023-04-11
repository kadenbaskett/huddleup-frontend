/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import { Button, Group, Modal, Checkbox, Table, Text, Grid, Space, Avatar } from '@mantine/core';
import { addDropPlayer } from '@services/apiClient';

export default function AddDropPlayerPopup({ roster, player, opened, onClose, userId }) {
  const [dropPlayers, setDropPlayers] = useState(new Set());
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setDropPlayers(new Set());
    setSubmitLoading(false);
  }, [opened]);

  const onSubmit = async () => {
    setSubmitLoading(true);

    if (dropPlayers.size) {
      const dropIds = Array.from(dropPlayers);
      await addDropPlayer(
        player.id,
        player.external_id,
        dropIds,
        roster.id,
        roster.team_id,
        userId,
        roster.week,
      );
    }

    setSubmitLoading(false);
    onClose();
  };

  const onClickDropPlayer = (p) => {
    const copy = new Set(dropPlayers);

    if (copy.has(p.id)) {
      copy.delete(p.id);
    } else {
      copy.add(p.id);
    }

    setDropPlayers(copy);
  };

  const getRoster = () => {
    if (!roster) return <></>;

    const rows = roster.players?.map((rosterPlayer) => {
      return (
        <tr key={rosterPlayer.id}>
          <td>
            <div className='flex'>
              <div>
                <Avatar src={rosterPlayer.player.photo_url} alt={'player image'} />
              </div>
              <div className='pl-2'>
                <div className='text-md text-darkBlue'>
                  {rosterPlayer.player.first_name} {rosterPlayer.player.last_name}
                </div>
                <div className='text-xs text-orange'>{rosterPlayer.position}</div>
              </div>
            </div>
          </td>
          <td>
            <Checkbox
              label={'Drop'}
              checked={dropPlayers.has(rosterPlayer.player.id)}
              onChange={(event) => onClickDropPlayer(rosterPlayer.player)}
            />
          </td>
        </tr>
      );
    });

    return (
      <Grid>
        <Grid.Col>
          <Text fz='md'>Add Player</Text>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Player</th>
              </tr>
            </thead>
            <tbody>
              <tr key={player?.id}>
                <td>
                  <div className='flex'>
                    <div>
                      <Avatar src={player?.photo_url} alt={'player image'} />
                    </div>
                    <div className='pl-2'>
                      <div className='text-md text-darkBlue'>
                        {player?.first_name} {player?.last_name}
                      </div>
                      <div className='text-xs text-orange'>{player?.position}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
          <Space h='md' />
          <Text fz='md'>Select player(s) to drop</Text>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Player</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Grid.Col>
      </Grid>
    );
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title={<Text fz='lg'>Roster full, select player(s) to drop</Text>}
        size={'100%'}
      >
        {getRoster()}
        <div className='pt-5'>
          <Group>
            <Button
              className={`${'bg-transparent hover:bg-red text-red hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-red rounded border-red transition ease-in duration-200`}
              variant='default'
              size='sm'
              color='red'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className={`${'bg-transparent hover:bg-green text-green hover:text-white'} hover:cursor-pointer p-4' text-xl font-bold hover:border hover:border-green rounded border-green transition ease-in duration-200`}
              variant='default'
              size='sm'
              color='red'
              loading={submitLoading}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
}
