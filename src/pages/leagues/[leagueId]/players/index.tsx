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
const flexPlayers = ['RB', 'WR', 'TE'];

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  // Application state
  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const leaguePlayerFetchStatus = useSelector(
    (state: StoreState) => state.league.playerFetchStatus,
  );
  const league = useSelector((state: StoreState) => state.league.league);
  const currentWeek = useSelector((state: StoreState) => state.global.week);
  const allPlayers = useSelector((state: StoreState) => state.league.playerList);

  // Player popup
  const [playerPopupOpen, setPlayerPopupOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(null);

  const onPlayerPopupClose = () => {
    setPlayerPopupOpen(false);
    setOpenPlayer(null);
  };

  const onPlayerClick = (p) => {
    setOpenPlayer(p);
    setPlayerPopupOpen(true);
  };

  // Player filtering
  const form = useForm({
    initialValues: {
      player: '',
      position: 'All',
      availability: 'Available',
    },
  });

  const [position, setPosition] = useState(form.values.position);
  const [availability, setAvailability] = useState(form.values.availability);

  const filterPlayers = () => {
    let players = allPlayers;
    console.log(players);

    if (position === 'FLEX') {
      players = players.filter((player) => flexPlayers.includes(player.position));
    } else if (position !== 'All') {
      players = players.filter((player) => player.position === position);
    }

    console.log(position);

    if (availability === 'Available') {
      // players = players.filter((player) => player.status === 'Active');
    } else if (availability === 'Waivers') {
      // TODO implement waivers
    }

    return players;
  };

  // If the app state has yet to fetch the league, run this
  useEffect(() => {
    if ((leagueInfoFetchStatus === 'idle' || leaguePlayerFetchStatus === 'idle') && leagueId) {
      dispatch(fetchLeaguePlayersThunk(Number(leagueId)));
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, leaguePlayerFetchStatus, dispatch, leagueId]);

  const getCurrentRosterPlayer = (player, week) => {
    week = 10;
    console.log(player.roster_players);
    return player.roster_players.find((rp) => rp.roster.week === week);
  };

  const getPlayerAvailability = (player) => {
    const currentRosterPlayer = getCurrentRosterPlayer(player, currentWeek);

    if (currentRosterPlayer) {
      return currentRosterPlayer.roster.team.name;
    } else {
      return 'Available';
    }
  };

  function getPlayerRows() {
    const players = filterPlayers();
    console.log(players);

    return players.map((p) => (
      <tr key={p.id} onClick={() => onPlayerClick(p)}>
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
  }

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
        <tbody>{getPlayerRows()}</tbody>
      </Table>
      <PlayerPopup player={openPlayer} opened={playerPopupOpen} onClose={onPlayerPopupClose} />
    </>
  );
}

export default league;
