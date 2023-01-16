import React, { useState } from 'react';
import { Button, Group, Modal, Text } from '@mantine/core';

export default function AddDropPlayerConfirmPopup({ player, isAdd, opened, onClose }) {
  const [submitLoading, setSubmitLoading] = useState(false);

  const onSubmit = () => {
    setSubmitLoading(true);

    // Send network request to Add/Drop player

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
          <Button color='red' onClick={onClose}>
            Cancel
          </Button>
          <Button loading={submitLoading} onClick={onSubmit}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}
