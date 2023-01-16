/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import { Button, Group, Modal, Checkbox, Table, Text, Grid, Space } from '@mantine/core';
import { addDropPlayer } from '@services/apiClient';

export default function AddDropPlayerPopup({ roster, player, opened, onClose }) {
  const [dropPlayers, setDropPlayers] = useState(new Set());
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setDropPlayers(new Set());
    setSubmitLoading(false);
  }, [opened]);

  const onSubmit = async () => {
    setSubmitLoading(true);

    if (dropPlayers.size) {
      const dropArr = Array.from(dropPlayers);
      const dropIds = dropArr.map((player) => player.id);
      const resp = await addDropPlayer(player.id, dropIds, roster.id);
      console.log(resp);
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
            {rosterPlayer.player.first_name} {rosterPlayer.player.last_name}
          </td>
          <td>{rosterPlayer.position}</td>
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
                <th>Name</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              <tr key={player?.id}>
                <td>
                  {player?.first_name} {player?.last_name}
                </td>
                <td>{player?.position}</td>
              </tr>
            </tbody>
          </Table>
          <Space h='md' />
          <Text fz='md'>Select player(s) to drop</Text>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Slot</th>
                <th>Name</th>
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
        size={'75%'}
      >
        {getRoster()}
        <Group>
          <Button color='red' onClick={onClose}>
            Cancel
          </Button>
          <Button loading={submitLoading} onClick={onSubmit}>
            Submit
          </Button>
        </Group>
      </Modal>
    </>
  );
}
