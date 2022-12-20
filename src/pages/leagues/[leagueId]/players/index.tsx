import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Avatar,
  Table,
  TextInput,
  Button,
  Group,
  Box,
  SegmentedControl,
  Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AppDispatch, StoreState } from '@store/store';
import { fetchLeagueInfoThunk, fetchLeaguePlayersThunk } from '@store/slices/leagueSlice';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';

// TODO config this
const allowedPositions = ['QB', 'RB', 'WR', 'TE'];
const flexPlayers = ['RB', 'WR', 'TE'];

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  // Form stuff
  const form = useForm({
    initialValues: {
      player: '',
      position: 'QB',
      availability: 'Available',
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const leaguePlayerFetchStatus = useSelector(
    (state: StoreState) => state.league.playerFetchStatus,
  );
  const league = useSelector((state: StoreState) => state.league.league);
  const currentWeek = useSelector((state: StoreState) => state.global.week);
  const allPlayers = useSelector((state: StoreState) => state.league.playerList);
  let players = allPlayers;

  const [position, setPosition] = useState(form.values.position);
  const [availability, setAvailability] = useState(form.values.availability);

  useEffect(() => {
    players = allPlayers;

    // TODO hacked in to not display all players
    if (players) {
      const offense = players.filter(
        (p) => allowedPositions.includes(p.position) && p.status === 'Active',
      );
      const playersWhoPlay = offense.filter((p) => p.player_game_stats.length > 8);
      // const owned = playersWhoPlay.filter((p) => p.roster_players.length);
      const owned = playersWhoPlay;
      players = owned.slice(0, 500);
    }

    if (position === 'FLEX') {
      players = allPlayers.filter((player) => flexPlayers.includes(player.position));
    } else if (position !== 'ALL') {
      players = allPlayers.filter((player) => player.position === position);
    }

    if (availability === 'Available') {
      // players = players.filter((player) => player.status === 'Active');
    } else if (availability === 'Waivers') {
      // TODO implement waivers
    }

    console.log(players);
  });

  // Player popup
  const [opened, setOpened] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(null);

  const onClose = () => {
    setOpened(false);
    setOpenPlayer(null);
  };

  const onOpen = (p) => {
    setOpenPlayer(p);
    setOpened(true);
  };

  useEffect(() => {
    if ((leagueInfoFetchStatus === 'idle' || leaguePlayerFetchStatus === 'idle') && leagueId) {
      dispatch(fetchLeaguePlayersThunk(Number(leagueId)));
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, leaguePlayerFetchStatus, dispatch, leagueId]);

  const getCurrentRosterPlayer = (player, week) => {
    // Week is a hack
    week = 10;
    return player.roster_players.find((rp) => rp.roster.week === week);
  };

  const getPlayerAvailability = (player) => {
    const currentRosterPlayer = getCurrentRosterPlayer(player, currentWeek);

    if (currentRosterPlayer) {
      return currentRosterPlayer.roster.team.name;
    }
    // else if(onWaivers)
    // {
    //   return 'Waivers';
    // }
    else {
      return 'Available';
    }
  };

  const rows = (displayPlayers) =>
    displayPlayers.map((p) => (
      <tr key={p.id} onClick={() => onOpen(p)}>
        <td>
          <Avatar src={p.photo_url} alt={'player image'} />
        </td>
        <td>
          {p.first_name} {p.last_name}
        </td>
        <td>{p.position}</td>
        <td>
          {p.current_nfl_team ? p.current_nfl_team.city : ''}{' '}
          {p.current_nfl_team ? p.current_nfl_team.name : ''}
        </td>
        <td>{p.status}</td>
        <td>{getPlayerAvailability(p)}</td>
      </tr>
    ));

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='players'
      />
      <Box sx={{ maxWidth: 300 }} mx='auto'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <SegmentedControl
            data={[
              { label: 'All', value: 'All' },
              { label: 'QB', value: 'QB' },
              { label: 'RB', value: 'RB' },
              { label: 'WR', value: 'WR' },
              { label: 'TE', value: 'TE' },
              { label: 'FLEX', value: 'FLEX' },
            ]}
            {...form.getInputProps('position')}
            onChange={setPosition}
            value={position}
          />
          <TextInput
            label='Player Name'
            placeholder='Justin Jefferson'
            {...form.getInputProps('player')}
          />

          <Select
            label='Availability'
            placeholder={availability}
            data={[
              { value: 'All', label: 'All' },
              { value: 'Available', label: 'Available' },
              { value: 'Waivers', label: 'Waivers' },
              { value: 'Free Agents', label: 'Free Agents' },
              { value: 'On Rosters', label: 'On Rosters' },
            ]}
            onChange={setAvailability}
            value={availability}
            {...form.getInputProps('availability')}
          />

          <Group position='right' mt='md'>
            <Button type='submit'>Submit</Button>
          </Group>
        </form>
      </Box>
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
            <th>Status</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>{rows(players)}</tbody>
      </Table>
      <PlayerPopup player={openPlayer} opened={opened} onClose={onClose} />
    </>
  );
}

export default league;
