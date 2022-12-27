import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Table } from '@mantine/core';
import { fantasyPoints } from '@services/helpers';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);
  const currentWeek = useSelector((state: StoreState) => state.global.week);

  const players = team?.rosters.find((roster) => roster.week === currentWeek)?.players;

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
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
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
