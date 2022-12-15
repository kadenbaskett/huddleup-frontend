import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Table } from '@mantine/core';
import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { fantasyPoints } from '@services/helpers';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const league = useSelector((state: StoreState) => state.league.league);

  // TODO we are just using the first team in the league right now
  // This just gets the latest roster of the first team
  // Also dont have such a messy if statement
  let players = [];
  if (league?.teams?.[0]?.rosters) {
    players = league.teams[0].rosters.at(-1).players;
  }

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);

  const rows = players.map((p) => (
    <tr key={p.id}>
      <td>
        {p.player.first_name} {p.player.last_name}
      </td>
      <td>{p.player.position}</td>
      <td>
        {p.player.current_nfl_team ? p.player.current_nfl_team.city : ''}{' '}
        {p.player.current_nfl_team ? p.player.current_nfl_team.name : ''}
      </td>
      {/* <td>{p.player.status}</td> */}
      <td>
        <img src={p.player.photo_url}></img>
      </td>
      <td>{fantasyPoints(p.player.player_game_stats.at(-1))}</td>
    </tr>
  ));

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='team'
      />
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
            {/* <th>Status</th> */}
            <th>Image</th>
            <th>Fantasy Points</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default league;
