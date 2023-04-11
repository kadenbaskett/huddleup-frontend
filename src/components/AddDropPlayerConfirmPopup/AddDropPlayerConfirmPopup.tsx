import React, { useState } from 'react';
import { Avatar, Button, Group, Modal, Table, Text } from '@mantine/core';
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
        title={<Text fz='lg'>{isAdd ? 'Add player?' : 'Drop player?'}</Text>}
        size={'100%'}
      >
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
