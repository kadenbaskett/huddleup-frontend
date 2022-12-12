import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Table } from '@mantine/core';
import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueStatus);
  const teams = useSelector((state: StoreState) => state.league.teams);

  let roster = {};

  if (teams) {
    roster = teams[0]?.rosters[teams[0]?.rosters.length - 1];
  }

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);

  const fantasyPoints = (s) => {
    if (s) {
      let points = 0;
      points -= 2 * s.interceptions_thrown;
      points += 4 * s.pass_td;
      points += 0.25 * s.pass_yards;
      points += 0.1 * s.rec_yards;
      points += 1 * s.receptions;
      points += 0.1 * s.rush_yards;
      points += 0.1 * s.rush_td;

      return points;
    }

    return '';
  };

  const rows = roster?.players?.map((p) => (
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
        leagueName={league ? league.name : ''}
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
