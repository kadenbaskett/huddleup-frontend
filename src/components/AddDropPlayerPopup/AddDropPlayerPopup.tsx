/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import { Button, Group, Modal, Checkbox, Table } from '@mantine/core';

export default function AddPlayerPopup({ roster, player, opened, onClose }) {
  const [dropPlayers, setDropPlayers] = useState(new Set());
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setDropPlayers(new Set());
    setSubmitLoading(false);
  }, opened);

  const onSubmit = () => {
    setSubmitLoading(true);

    // Send network request to change roster
    console.log('drop', dropPlayers);

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

    const rows = roster.players.map((rosterPlayer) => {
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
    );
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title={'Roster is full, select a player to drop'}
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
