import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Avatar, Table } from '@mantine/core';
import { AppDispatch, StoreState } from '@store/store';
import { fetchLeagueInfoThunk, fetchLeaguePlayersThunk } from '@store/slices/leagueSlice';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const leaguePlayerFetchStatus = useSelector(
    (state: StoreState) => state.league.playerFetchStatus,
  );
  let players = useSelector((state: StoreState) => state.league.playerList);
  const league = useSelector((state: StoreState) => state.league.league);
  const currentWeek = useSelector((state: StoreState) => state.global.week);

  if (players) {
    const allowedPositions = ['QB', 'RB', 'WR', 'TE'];
    const offense = players.filter(
      (p) => allowedPositions.includes(p.position) && p.status === 'Active',
    );
    const playersWhoPlay = offense.filter((p) => p.player_game_stats.length > 8);
    const owned = playersWhoPlay.filter((p) => p.roster_players.length);
    players = owned.slice(0, 50);
    // console.log(players[0]);
  }

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

  const getPlayerAvailability = (player) => {
    let currentRosterPlayer = player.roster_players.find((rp) => rp.roster.week === currentWeek);

    // TODO HACKED IN
    if (player.roster_players.length) {
      currentRosterPlayer = player.roster_players.at(-1);
    }

    const currentRoster = currentRosterPlayer.roster;

    if (currentRoster) {
      return currentRoster.team.name;
    }
    // else if(onWaivers)
    // {
    //   return 'Waivers';
    // }
    else {
      return 'Available';
    }
  };

  const rows = players.map((p) => (
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
        <tbody>{rows}</tbody>
      </Table>
      <PlayerPopup player={openPlayer} opened={opened} onClose={onClose} />
    </>
  );
}

export default league;
