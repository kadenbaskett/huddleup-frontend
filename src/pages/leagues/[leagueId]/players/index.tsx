/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GrAddCircle, GrDisabledOutline, GrLinkNext } from 'react-icons/gr';
import { Avatar, TextInput, SegmentedControl, NativeSelect, Group, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { StoreState } from '@store/store';
import { fantasyPoints, getPlayerAvailability, getTeamThatOwnsPlayer } from '@services/helpers';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import CONFIG from '@services/config';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import AddDropPlayerConfirmPopup from '@components/AddDropPlayerConfirmPopup/AddDropPlayerConfirmPopup';
import AddDropPlayerPopup from '@components/AddDropPlayerPopup/AddDropPlayerPopup';
import TradePlayerPopup from '@components/TradePlayerPopup/TradePlayerPopup';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

function League(props) {
  const store = useSelector((state: StoreState) => state);
  // Application state
  const leagueInfoFetchStatus: String = store.league.status;
  const allPlayers = store.league.playerList;
  const league = store.league.league;
  const myTeam = store.league.userTeam;
  const currentWeek = store.global.week;
  const user = store.user.userInfo;

  // Trade popup
  const [tradePopupOpen, setTradePopupOpen] = useState(false);
  const [tradeRoster, setTradeRoster] = useState(null);

  // Are we adding or dropping the player?
  const [addingPlayer, setAddingPlayer] = useState(false);

  // Confirm popup
  const [addDropConfirmPopupOpen, setAddDropConfirmPopupOpen] = useState(false);

  // Add Drop popup
  const [addDropPopupOpen, setAddDropPopupOpen] = useState(false);

  // Player popup
  const [playerPopupOpen, setPlayerPopupOpen] = useState(false);

  // Used for all popups
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // On close methods of popups
  const onTradePopupClose = () => {
    setTradePopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropPopupClose = () => {
    setAddDropPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropConfirmClose = () => {
    setAddDropConfirmPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onPlayerPopupClose = () => {
    setPlayerPopupOpen(false);
  };

  // When a player is clicked
  const onPlayerClick = (event, p) => {
    event.preventDefault();
    setSelectedPlayer(p);
    setPlayerPopupOpen(true);
  };

  // When the icon to add/drop/trade a player is clicked
  const onPlayerActionClick = (event, player) => {
    event.preventDefault();
    takePlayerAction(player);
  };

  // Takes the necessary action to add/drop/trade for player
  const takePlayerAction = (player) => {
    setSelectedPlayer(player);

    const playerTeam = getTeamThatOwnsPlayer(player, currentWeek, league.id);
    const myRoster = getMyRoster();
    const isMyPlayer = playerTeam?.id === myTeam.id;

    // Nobody owns the player -> they are a free agent
    if (!playerTeam) {
      // TODO use league settings instead of CONFIG
      // No need to drop a player as part of the transaction if your roster isn't full
      if (myRoster.players.length < CONFIG.maxRosterSize) {
        setAddingPlayer(true);
        setAddDropConfirmPopupOpen(true);
      } else {
        setAddDropPopupOpen(true);
      }
    }
    // I own the player - so drop them
    else if (isMyPlayer) {
      setAddingPlayer(false);
      setAddDropConfirmPopupOpen(true);
    }
    // Another team owns this player - so propose a trade
    else {
      const tradeTeam = league.teams.find((t) => t.id === playerTeam.id);
      const tradeRoster = tradeTeam.rosters.find((r) => r.week === currentWeek);

      setTradeRoster(tradeRoster);
      setTradePopupOpen(true);
    }
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
    columnAccessor: 'currentWeekProj',
    direction: 'desc',
  });
  const [records, setRecords] = useState(sortBy(allPlayers, 'currentWeekProj'));

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
        return !getTeamThatOwnsPlayer(player, currentWeek, league.id);
      });
    } else if (availability === 'Waivers') {
      // TODO implement waivers
    } else if (availability === 'Free Agents') {
      // TODO also filter out waivers
      players = players.filter((player) => {
        return !getTeamThatOwnsPlayer(player, currentWeek, league.id);
      });
    } else if (availability === 'On Rosters') {
      players = players.filter((player) => {
        const team = getTeamThatOwnsPlayer(player, currentWeek, league.id);
        return team ? team.name : '';
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
      const lastWeekStats = p.player_game_stats?.find((pgs) => pgs.game?.week === currentWeek - 1);
      const currentWeekStats = p.player_game_stats?.find((pgs) => pgs.game?.week === currentWeek);
      const currentWeekProjStats = p.player_projections?.find(
        (proj) => proj.game?.week === currentWeek,
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

  const getPlayerAction = (player) => {
    const av = getPlayerAvailability(player, currentWeek, league.id);
    const myTeamName = myTeam?.name;

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

  const getMyRoster = () => {
    return myTeam ? myTeam.rosters.find((r) => r.week === currentWeek) : [];
  };

  return (
    <>
      <LeagueNavBar
        teamName={myTeam.name}
        teamId={myTeam.id}
        leagueName={league.name}
        leagueId={league.id}
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
              player={selectedPlayer}
              opened={playerPopupOpen}
              onClose={onPlayerPopupClose}
              onPlayerAction={takePlayerAction}
              leagueId={league.id}
            />
            <AddDropPlayerPopup
              roster={getMyRoster()}
              player={selectedPlayer}
              opened={addDropPopupOpen}
              onClose={onAddDropPopupClose}
              userId={user.id}
            />
            <TradePlayerPopup
              otherRoster={tradeRoster}
              myRoster={getMyRoster()}
              player={selectedPlayer}
              opened={tradePopupOpen}
              onClose={onTradePopupClose}
              userId={user.id}
              week={currentWeek}
            />
            <AddDropPlayerConfirmPopup
              roster={getMyRoster()}
              isAdd={addingPlayer}
              player={selectedPlayer}
              opened={addDropConfirmPopupOpen}
              onClose={onAddDropConfirmClose}
              userId={user.id}
            />
          </Grid>
        </div>
      )}
    </>
  );
}

export default League;
