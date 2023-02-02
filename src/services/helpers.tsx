import { Table } from '@mantine/core';
import Link from 'next/link';

export function mapPositionToTable(player, gameLogs) {
  if (!player) return <></>;

  if (player.position === 'QB') {
    const cols = (
      <thead>
        <tr>
          <th>WEEK</th>
          <th>C / A</th>
          <th>YDS</th>
          <th>TD</th>
          <th>INT</th>
          <th>CAR</th>
          <th>YDS</th>
          <th>TD</th>
          <th>PTS</th>
        </tr>
      </thead>
    );

    const rows = gameLogs.map((game) => (
      <tr key={game.id}>
        <td>{game.game.week}</td>
        <td>
          {game.completions}/{game.pass_attempts}
        </td>
        <td>{game.pass_yards}</td>
        <td>{game.pass_td}</td>
        <td>{game.interceptions_thrown}</td>
        <td>{game.rush_attempts}</td>
        <td>{game.rush_yards}</td>
        <td>{game.rush_td}</td>
        <td>{fantasyPoints(game)}</td>
      </tr>
    ));

    return (
      <Table fontSize='xs'>
        {cols}
        <tbody>{rows}</tbody>
      </Table>
    );
  } else if (player.position === 'K') {
    const cols = (
      <thead>
        <tr>
          <th>Extra Points</th>
          <th>PTS</th>
        </tr>
      </thead>
    );

    const rows = gameLogs.map((game) => (
      <tr key={game.id}>
        <td>{1}</td>
        <td>{fantasyPoints(game)}</td>
      </tr>
    ));

    return (
      <Table fontSize='xs'>
        {cols}
        <tbody>{rows}</tbody>
      </Table>
    );
  } // TE, WR, RB
  else {
    const cols = (
      <thead>
        <tr>
          <th>WEEK</th>
          <th>CAR</th>
          <th>YDS</th>
          <th>TD</th>
          <th>TAR</th>
          <th>REC</th>
          <th>YDS</th>
          <th>TD</th>
          <th>FMB</th>
          <th>PTS</th>
        </tr>
      </thead>
    );

    const rows = gameLogs.map((game) => (
      <tr key={game.id}>
        <td>{game.game.week}</td>
        <td>{game.rush_attempts}</td>
        <td>{game.rush_yards}</td>
        <td>{game.rush_td}</td>
        <td>{game.targets}</td>
        <td>{game.receptions}</td>
        <td>{game.rec_yards}</td>
        <td>{game.rec_td ? 1 : ''}</td>
        <td>{game.fumbles ? 1 : ''}</td>
        <td>{fantasyPoints(game)}</td>
      </tr>
    ));

    return (
      <Table fontSize='xs'>
        {cols}
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export function fantasyPoints(s, pprValue = 1) {
  // console.log('s', s);
  if (s) {
    let points = 0;
    points += -2 * s.interceptions_thrown;
    points -= 2 * s.fumbles;
    points += 4 * s.pass_td;
    points += (4 / 100) * s.pass_yards;
    points += 0.1 * s.rec_yards;
    points += 6 * s.rec_td;
    points += pprValue * s.receptions; // PPR leagues
    points += 0.1 * s.rush_yards;
    points += 0.1 * s.rush_td;
    points += 2 * s.two_point_conversion_passes;
    points += 2 * s.two_point_conversion_receptions;
    points += 2 * s.two_point_conversion_runs;

    return Number(points.toFixed(1));
  }

  return 0;
}

export function calculateMatchupResults(league, currentWeek) {
  const results = [];

  for (let m of league.matchups) {
    if (m.week <= currentWeek) {
      const homeTeam = league.teams.find((t) => t.id === m.home_team_id);
      const awayTeam = league.teams.find((t) => t.id === m.away_team_id);

      const homeRoster = homeTeam.rosters.find((r) => r.week === m.week);
      const awayRoster = awayTeam.rosters.find((r) => r.week === m.week);

      let homeScore = 0;
      for (const p of homeRoster.players) {
        const pgs = p.player.player_game_stats.find((pgs) => pgs.game.week === m.week);
        homeScore += Number(fantasyPoints(pgs));
      }

      let awayScore = 0;
      for (const p of awayRoster.players) {
        const pgs = p.player.player_game_stats.find((pgs) => pgs.game.week === m.week);
        awayScore += Number(fantasyPoints(pgs));
      }

      m = {
        ...m,
        homeScore,
        awayScore,
      };

      results.push(m);
    }
  }

  return results;
}

export function calculateStandings(league, currentWeek) {
  const matchupResults = calculateMatchupResults(league, currentWeek);
  const teams = league.teams.map((t) => {
    return {
      ...t,
      league,
      wins: 0,
      losses: 0,
    };
  });

  for (const m of matchupResults) {
    const winnerId = m.homeScore > m.awayScore ? m.home_team_id : m.away_team_id;
    const loserId = m.homeScore > m.awayScore ? m.away_team_id : m.home_team_id;
    const winnerIndex = teams.findIndex((t) => t.id === winnerId);
    const loserIndex = teams.findIndex((t) => t.id === loserId);

    teams[winnerIndex].wins++;
    teams[loserIndex].losses++;
  }

  return teams.sort((teamOne, teamTwo) => teamTwo.wins - teamOne.wins);
}

export function createManagerString(managers) {
  let i = 0;
  const tempManagerString = managers.map((m) => {
    i++;
    const id: number = m.user.id;
    return (
      <>
        {<Link href={`/user/${id}/profile`}>{m.user.username}</Link>}
        {i !== managers.length ? ', ' : ''}
      </>
    );
  });
  return tempManagerString;
}
