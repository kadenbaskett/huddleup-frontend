/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GrAddCircle, GrDisabledOutline, GrLinkNext } from 'react-icons/gr';
import { Avatar, TextInput, SegmentedControl, NativeSelect, Group, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { StoreState } from '@store/store';
import { fantasyPoints } from '@services/helpers';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import CONFIG from '@services/config';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import AddDropPlayerConfirmPopup from './components/AddDropPlayerConfirmPopup/AddDropPlayerConfirmPopup';
import AddDropPlayerPopup from './components/AddDropPlayerPopup/AddDropPlayerPopup';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

function League(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  // Application state
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const allPlayers = useSelector((state: StoreState) => state.league.playerList);
  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);
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
    const myTeam = team ? team.name : ' ';

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
    if (allPlayers) {
      const data = sortBy(filterPlayers(), sortStatus.columnAccessor);
      setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }
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
      // TODO hacked in proj
      const lastWeekStats = p.player_game_stats?.find((pgs) => pgs.game?.week === currentWeek - 1);
      const currentWeekStats = p.player_game_stats?.find((pgs) => pgs.game?.week === currentWeek);
      const currentWeekProjStats = p.player_game_stats?.find(
        (pgs) => pgs.game?.week === currentWeek,
      );

      return {
        ...p,
        currentWeek: currentWeekStats ? fantasyPoints(currentWeekStats) : 0,
        currentWeekProj: currentWeekProjStats ? fantasyPoints(currentWeekProjStats) : 0,
        lastWeek: lastWeekStats ? fantasyPoints(lastWeekStats) : 0,
      };
    });

    return players;
  };

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
    const myTeamName = team ? team.name : ' ';

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
    // TODO maybe get the roster of current week
    return team ? team.rosters.at(-1) : [];
  };

  return (
    <>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='players'
      />
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='bg-lightGrey pt-4 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
          <Grid>
            <Grid.Col span={10} offset={1}>
              <Grid.Col>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                  <div className='bg-white rounded-xl hover:drop-shadow-md'>
                    <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
                      Filters
                    </div>
                    <div className='pr-4 pl-4 pt-2'>
                      <div className='text-md font-varsity text-darkBlue'>Position:</div>
                      <SegmentedControl
                        color='orange'
                        fullWidth
                        transitionDuration={400}
                        transitionTimingFunction='linear'
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
                    </div>
                    <div className='pr-4 pl-4 pt-2'>
                      <div className='text-md font-varsity text-darkBlue'>Player Name:</div>
                      <TextInput placeholder='Justin Jefferson' {...form.getInputProps('player')} />
                    </div>
                    <div className='pr-4 pl-4 pt-2 pb-4'>
                      <div className='text-md font-varsity text-darkBlue'>Availability:</div>
                      <NativeSelect
                        data={['All', 'Available', 'Waivers', 'Free Agents', 'On Rosters']}
                        {...form.getInputProps('availability')}
                      />
                    </div>
                  </div>
                </form>
              </Grid.Col>
              <Grid.Col span={12}>
                <DataTable
                  className='bg-white rounded-xl hover:drop-shadow-md'
                  withBorder
                  highlightOnHover
                  striped
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
                      accessor: 'currentWeek',
                      title: `Week ${currentWeek} (actual)`,
                      sortable: true,
                    },
                    {
                      accessor: 'currentWeekProj',
                      title: `Week ${currentWeek} (projection)`,
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
            <PlayerPopup
              player={openPlayer}
              opened={playerPopupOpen}
              onClose={onPlayerPopupClose}
            />
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
        </div>
      )}
    </>
  );
}

export default League;
