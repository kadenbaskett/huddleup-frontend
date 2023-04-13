/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import { Button, Group, Modal, Checkbox, Table, Text, Grid, Space, Avatar } from '@mantine/core';
import { proposeTrade } from '@services/apiClient';

export default function TradePlayerPopup({
  otherRoster,
  myRoster,
  player,
  opened,
  onClose,
  userId,
  week,
}) {
  const [sendPlayers, setSendPlayers] = useState(new Set());
  const [receivingPlayers, setReceivePlayers] = useState(new Set());
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    setSendPlayers(new Set());
    const s = new Set();
    if (player) s.add(player.id);
    setReceivePlayers(s);
    setSubmitLoading(false);
  }, [opened]);

  const onSubmit = async () => {
    setSubmitLoading(true);

    if (sendPlayers.size && sendPlayers.size === receivingPlayers.size) {
      const sendPlayerIds = Array.from(sendPlayers);
      const recPlayerIds = Array.from(receivingPlayers);
      await proposeTrade(
        sendPlayerIds,
        recPlayerIds,
        myRoster.id,
        otherRoster.id,
        myRoster.team_id,
        otherRoster.team_id,
        userId,
        week,
      );
    }

    setSubmitLoading(false);
    onClose();
  };

  const onClickSendPlayer = (p) => {
    const copy = new Set(sendPlayers);

    if (copy.has(p.id)) {
      copy.delete(p.id);
    } else {
      copy.add(p.id);
    }

    setSendPlayers(copy);
  };

  const onClickReceivePlayer = (p) => {
    const copy = new Set(receivingPlayers);

    if (copy.has(p.id)) {
      copy.delete(p.id);
    } else {
      copy.add(p.id);
    }

    setReceivePlayers(copy);
  };

  const getOtherRoster = () => {
    if (!otherRoster) return <></>;

    const rows = otherRoster.players?.map((rosterPlayer) => {
      return (
        <tr key={rosterPlayer.id}>
          <div className='flex'>
            <div className='pl-2'>
              <Avatar src={rosterPlayer.player.photo_url} alt={'player image'} />
            </div>
            <div className='pl-2'>
              <div className='text-md text-darkBlue'>
                {rosterPlayer.player.first_name} {rosterPlayer.player.last_name}
              </div>
              <div className='text-xs text-orange'>{rosterPlayer.position}</div>
            </div>
          </div>
          <td>
            <Checkbox
              label={'Select'}
              checked={receivingPlayers.has(rosterPlayer.player.id)}
              onChange={(event) => onClickReceivePlayer(rosterPlayer.player)}
            />
          </td>
        </tr>
      );
    });

    return (
      <Grid>
        <Grid.Col>
          <Space h='md' />
          <Text fz='md'>Select player(s) to receive</Text>
          <Table verticalSpacing='sm' striped highlightOnHover withBorder withColumnBorders>
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

  const getMyRoster = () => {
    if (!myRoster) return <></>;

    const rows = myRoster.players?.map((rosterPlayer) => {
      return (
        <tr key={rosterPlayer.id}>
          <div className='flex'>
            <div className='pl-2'>
              <Avatar src={rosterPlayer.player.photo_url} alt={'player image'} />
            </div>
            <div className='pl-2'>
              <div className='text-md text-darkBlue'>
                {rosterPlayer.player.first_name} {rosterPlayer.player.last_name}
              </div>
              <div className='text-xs text-orange'>{rosterPlayer.position}</div>
            </div>
          </div>
          <td>
            <Checkbox
              label={'Select'}
              checked={sendPlayers.has(rosterPlayer.player.id)}
              onChange={(event) => onClickSendPlayer(rosterPlayer.player)}
            />
          </td>
        </tr>
      );
    });

    return (
      <Grid>
        <Grid.Col>
          <Space h='md' />
          <Text fz='md'>Select player(s) to trade away</Text>
          <Table verticalSpacing='sm' striped highlightOnHover withBorder withColumnBorders>
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
        title={<Text fz='lg'>Select Players</Text>}
        size={'100%'}
        overlayProps={{
          blur: 3,
        }}
      >
        <Grid>
          <Grid.Col span={5} offset={0}>
            {getOtherRoster()}
          </Grid.Col>
          <Grid.Col span={5} offset={1}>
            {getMyRoster()}
          </Grid.Col>
        </Grid>
        <Space h='md' />
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
