/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GrAddCircle, GrDisabledOutline, GrLinkNext } from 'react-icons/gr';
import { Avatar, TextInput, SegmentedControl, NativeSelect, Group, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { AppDispatch, StoreState } from '@store/store';
import { fetchLeagueInfoThunk, fetchLeaguePlayersThunk } from '@store/slices/leagueSlice';
import { fetchTimeframesThunk } from '@store/slices/globalSlice';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { fantasyPoints } from '@services/helpers';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import CONFIG from '@services/config';
import AddDropPlayerPopup from '@components/AddDropPlayerPopup/AddDropPlayerPopup';
import AddDropPlayerConfirmPopup from '@components/AddDropPlayerConfirmPopup/AddDropPlayerConfirmPopup';

function League(props) {
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

  // Confirm popup
  const [addDropConfirmPopupOpen, setAddDropConfirmPopupOpen] = useState(false);
  const [isAddPlayer, setIsAddPlayer] = useState(false);

  // Add Drop popup
  const [addDropPopupOpen, setAddDropPopupOpen] = useState(false);

  // Used for both popups
  const [addPlayer, setAddPlayer] = useState(null);

  const onAddDropPopupClose = () => {
    setAddDropPopupOpen(false);
    setAddPlayer(null);
  };

  const onAddDropConfirmClose = () => {
    setAddDropConfirmPopupOpen(false);
    setAddPlayer(null);
  };

  // Generic add drop popup
  const onPlayerActionClick = (event, player) => {
    event.preventDefault();

    const avail = getPlayerAvailability(player);
    const roster = getTeamRoster();
    const myTeam = 'My team name';

    if (avail === 'Free Agent') {
      setAddPlayer(player);

      if (roster.players.length < CONFIG.maxRosterSize) {
        setIsAddPlayer(true);
        setAddDropConfirmPopupOpen(true);
      } else {
        setAddDropPopupOpen(true);
      }
    } else if (avail === 'Waivers') {
      // waivers
    } else if (avail === myTeam) {
      // drop
    } else {
      // trade
    }
  };

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

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'projection',
    direction: 'desc',
  });
  const [records, setRecords] = useState(sortBy(allPlayers, 'projection'));

  useEffect(() => {
    const data = sortBy(filterPlayers(), sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus, allPlayers, form.values]);

  const filterPlayers = () => {
    let players = allPlayers;

    const position = form.values.position;

    if (position === 'FLEX') {
      players = players.filter((player) => CONFIG.flexPositions.includes(player.position));
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
          if (fullName.toLowerCase().includes(word.toLowerCase())) return true;
        }
        return false;
      });
    }

    // Only display first 50 results
    players = players.slice(0, 50);

    // Add extra fields for the table sorting
    players = players.map((p) => {
      return {
        ...p,
        projection: fantasyPoints(p.player_game_stats.at(-1)),
        lastWeek: fantasyPoints(p.player_game_stats.at(-2)),
      };
    });

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

  const getTeamRoster = () => {
    return league?.teams?.at(-1)?.rosters?.at(-1);
  };

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='players'
      />
      <Grid>
        <Grid.Col span={10} offset={1}>
          <Grid.Col span={4}>
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
          </Grid.Col>
          <Grid.Col span={12}>
            <DataTable
              withBorder
              withColumnBorders
              records={records}
              columns={[
                {
                  accessor: 'first_name',
                  title: 'Player',
                  render: (p) => (
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
                  ),
                },
                {
                  accessor: 'status',
                  title: 'Status',
                  render: (p) => (
                    <a href='#' onClick={(evt) => onPlayerActionClick(evt, p)}>
                      {getPlayerAction(p)}
                    </a>
                  ),
                },
                {
                  accessor: 'projection',
                  title: `Week ${currentWeek}`,
                  sortable: true,
                },
                {
                  accessor: 'lastWeek',
                  title: `Week ${currentWeek - 1}`,
                  sortable: true,
                },
              ]}
              sortStatus={sortStatus}
              onSortStatusChange={setSortStatus}
            />
          </Grid.Col>
        </Grid.Col>
        <PlayerPopup player={openPlayer} opened={playerPopupOpen} onClose={onPlayerPopupClose} />
        <AddDropPlayerPopup
          roster={getTeamRoster()}
          player={addPlayer}
          opened={addDropPopupOpen}
          onClose={onAddDropPopupClose}
        />
        <AddDropPlayerConfirmPopup
          isAdd={isAddPlayer}
          player={addPlayer}
          opened={addDropConfirmPopupOpen}
          onClose={onAddDropConfirmClose}
        />
      </Grid>
    </>
  );
}

export default League;
