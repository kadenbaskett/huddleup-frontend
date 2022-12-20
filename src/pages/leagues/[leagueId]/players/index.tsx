/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrAddCircle, GrDisabledOutline, GrLinkNext } from 'react-icons/gr';
import {
  Avatar,
  TextInput,
  Box,
  SegmentedControl,
  NativeSelect,
  Group,
  Table,
  Container,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AppDispatch, StoreState } from '@store/store';
import { fetchLeagueInfoThunk, fetchLeaguePlayersThunk } from '@store/slices/leagueSlice';
import { fetchTimeframesThunk } from '@store/slices/globalSlice';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { fantasyPoints } from '@services/helpers';

// TODO config this
const flexPlayers = ['RB', 'WR', 'TE'];

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  // Application state
  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const allPlayers = useSelector((state: StoreState) => state.league.playerList);
  const leaguePlayerFetchStatus = useSelector(
    (state: StoreState) => state.league.playerFetchStatus,
  );
  const timeframeFetchStatus = useSelector((state: StoreState) => state.global.timeframeStatus);
  const league = useSelector((state: StoreState) => state.league.league);
  const currentWeek = useSelector((state: StoreState) => state.global.week);

  // Player popup
  const [playerPopupOpen, setPlayerPopupOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(null);

  const onPlayerPopupClose = () => {
    setPlayerPopupOpen(false);
    setOpenPlayer(null);
  };

  const onPlayerClick = (event, p) => {
    event.preventDefault();
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

  const [position, setPosition] = useState<string | null>(form.values.position);

  const filterPlayers = () => {
    let players = allPlayers;
    console.log(players.length);

    if (position === 'FLEX') {
      players = players.filter((player) => flexPlayers.includes(player.position));
    } else if (position !== 'All') {
      players = players.filter((player) => player.position === position);
    }

    const availability = form.values.availability;

    if (availability === 'Available') {
      players = players.filter((player) => {
        return !getTeamThatOwnsPlayer(player);
      });
    } else if (availability === 'Waivers') {
      // TODO implement waivers
    } else if (availability === 'Free Agents') {
      // TODO also filter out waivers
      players = players.filter((player) => {
        return !getTeamThatOwnsPlayer(player);
      });
    } else if (availability === 'On Rosters') {
      players = players.filter((player) => {
        return getTeamThatOwnsPlayer(player);
      });
    }

    const playerSearchName = form.values.player;

    if (playerSearchName !== '') {
      const words = playerSearchName.split(' ');

      players = players.filter((player) => {
        const fullName = `${player.first_name}${player.last_name}`;

        for (const word of words) {
          if (fullName.includes(word)) return true;
        }
        return false;
      });
    }

    return players;
  };

  // If the app state has yet to fetch the league, run this
  useEffect(() => {
    if (
      (leagueInfoFetchStatus === 'idle' ||
        leaguePlayerFetchStatus === 'idle' ||
        timeframeFetchStatus === 'idle') &&
      leagueId
    ) {
      dispatch(fetchLeaguePlayersThunk(Number(leagueId)));
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
      dispatch(fetchTimeframesThunk());
    }
  }, [leagueInfoFetchStatus, leaguePlayerFetchStatus, dispatch, leagueId]);

  const getTeamThatOwnsPlayer = (player) => {
    const currentRosterPlayer = player.roster_players.find((rp) => rp.roster.week === currentWeek);
    return currentRosterPlayer ? currentRosterPlayer.roster.team.name : null;
  };

  const getPlayerAvailability = (player) => {
    const teamName = getTeamThatOwnsPlayer(player);
    const onWaivers = false;

    if (teamName) {
      return teamName;
    } else if (onWaivers) {
      return 'Waivers';
    } else {
      return 'Free Agent';
    }
  };

  const getPlayerAction = (player) => {
    const av = getPlayerAvailability(player);
    const myTeamName = 'My team';

    if (av === 'Free Agent') {
      return (
        <Group>
          <GrAddCircle />
          {av}
        </Group>
      );
    } else if (av === 'Waivers') {
      return (
        <Group>
          <GrAddCircle />
          {av}
        </Group>
      );
    } else if (av === myTeamName) {
      return (
        <Group>
          <GrDisabledOutline />
          {av}
        </Group>
      );
    } else {
      return (
        <Group>
          <GrLinkNext />
          {av}
        </Group>
      );
    }
  };

  const onPlayerActionClick = (event, player) => {
    event.preventDefault();
    console.log(player);
  };

  function getPlayerRows() {
    const players = filterPlayers();

    return players.map((p) => (
      <tr key={p.id}>
        <td>
          <a href='#' onClick={(evt) => onPlayerClick(evt, p)}>
            <Group>
              <Avatar src={p.photo_url} alt={'player image'} />
              {p.first_name} {p.last_name}
              {'\n'}
              {p.position}
              {'\n'}
              {p.current_nfl_team ? p.current_nfl_team.key : ''}
            </Group>
          </a>
        </td>
        <td>
          <a href='#' onClick={(evt) => onPlayerActionClick(evt, p)}>
            {getPlayerAction(p)}
          </a>
        </td>
        <td>{fantasyPoints(p.player_game_stats.at(-2))}</td>
        <td>{fantasyPoints(p.player_game_stats.at(-1))}</td>
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
      <Container>
        <Box sx={{ maxWidth: 300 }}>
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

            <NativeSelect
              label='Availability'
              data={['All', 'Available', 'Waivers', 'Free Agents', 'On Rosters']}
              {...form.getInputProps('availability')}
            />
          </form>
        </Box>
        <Table striped highlightOnHover withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Player</th>
              <th>Status</th>
              <th>NFL Week {currentWeek}</th>
              <th>NFL Week {currentWeek - 1}</th>
            </tr>
          </thead>
          <tbody>{getPlayerRows()}</tbody>
        </Table>
        <PlayerPopup player={openPlayer} opened={playerPopupOpen} onClose={onPlayerPopupClose} />
      </Container>
    </>
  );
}

export default league;
