import React, { useState } from 'react';
import { Button, Group, Modal, Text } from '@mantine/core';
import { addPlayer, dropPlayer } from '@services/apiClient';

export default function AddDropPlayerConfirmPopup({
  roster,
  player,
  isAdd,
  opened,
  onClose,
  userId,
}) {
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = async () => {
    setSubmitLoading(true);

    if (isAdd) {
      await addPlayer(
        player.id,
        player.external_id,
        roster.id,
        roster.team_id,
        userId,
        roster.week,
      );
    } else {
      await dropPlayer(player.id, roster.id, roster.team_id, userId, roster.week);
    }

    setSubmitLoading(false);
    onClose();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title={
          <Text fz='lg'>
            Are you sure you want to {isAdd ? 'add' : 'drop'} {player?.first_name}{' '}
            {player?.last_name}?
          </Text>
        }
        size={'75%'}
      >
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
      </Modal>
    </>
  );
}
