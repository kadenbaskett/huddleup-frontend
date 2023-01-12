import { Table } from '@mantine/core';

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

    return points.toFixed(1);
  }

  return 0;
}
