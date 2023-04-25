import { League } from '@interfaces/league.interface';
import { Table } from '@mantine/core';
import { useState, useEffect } from 'react';
import {
  GiVibratingShield,
  GiSlashedShield,
  GiSpikedShield,
  GiEyeShield,
  GiFireShield,
  GiEnergyShield,
  GiEdgedShield,
  GiDragonShield,
  GiBoltShield,
  GiBorderedShield,
  GiMagicShield,
} from 'react-icons/gi';
import stc from 'string-to-color';

export const HuddleUpDate = (date: Date) => {
  return date.toUTCString();
};

export const getTeamThatOwnsPlayer = (player, currentWeek, leagueId) => {
  const currentRosterPlayer = player?.roster_players?.find(
    (rp) => rp.roster.week === currentWeek && rp.roster.team.league_id === leagueId,
  );
  return currentRosterPlayer ? currentRosterPlayer.roster.team : null;
};

export const getPlayerAvailability = (player, currentWeek, leagueId) => {
  const team = getTeamThatOwnsPlayer(player, currentWeek, leagueId);
  const teamName = team ? team.name : '';
  const onWaivers = false;

  if (teamName) {
    return teamName;
  } else if (onWaivers) {
    return 'Waivers';
  } else {
    return 'Free Agent';
  }
};

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
      <tr key={game?.id}>
        <td>{game?.game.week}</td>
        <td>
          {game?.completions}/{game?.pass_attempts}
        </td>
        <td>{game?.pass_yards}</td>
        <td>{game?.pass_td}</td>
        <td>{game?.interceptions_thrown}</td>
        <td>{game?.rush_attempts}</td>
        <td>{game?.rush_yards}</td>
        <td>{game?.rush_td}</td>
        <td>{fantasyPoints(game)}</td>
      </tr>
    ));

    return (
      <Table striped highlightOnHover fontSize='xs'>
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
      <tr key={game?.id}>
        <td>{game?.game?.week}</td>
        <td>{game?.rush_attempts}</td>
        <td>{game?.rush_yards}</td>
        <td>{game?.rush_td}</td>
        <td>{game?.targets}</td>
        <td>{game?.receptions}</td>
        <td>{game?.rec_yards}</td>
        <td>{game?.rec_td}</td>
        <td>{game?.fumbles}</td>
        <td>{fantasyPoints(game)}</td>
      </tr>
    ));

    return (
      <Table striped highlightOnHover fontSize='xs'>
        {cols}
        <tbody>{rows}</tbody>
      </Table>
    );
  }
}

export function fantasyPoints(s, pprValue = 1): number {
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
    return (
      <>
        {m.user?.username}
        {i !== managers.length ? ', ' : ''}
        {i === managers.length ? <br /> : ''}
      </>
    );
  });
  return tempManagerString;
}

export function findTeamByToken(league, token: string) {
  return league.teams.find((team) => team.token === token);
}

export async function findLeagueByToken(privateleagues, token: string) {
  const league: League = privateleagues.find((league) => league.token === token);
  return league.id;
}

export function getTeamScore(roster, week) {
  let score = 0;
  roster.players.forEach((player) => {
    if (player.position === 'BE') return;
    const stats = player.player.player_game_stats.find((stat) => stat.game.week === week);
    score += fantasyPoints(stats);
  });
  return Math.round(score * 100) / 100;
}

export function useWindowResize() {
  const [dimension, setDimension] = useState([0, 0]);

  useEffect(() => {
    setDimension([window.innerWidth, window.innerHeight]);

    window.addEventListener('resize', () => {
      setDimension([window.innerWidth, window.innerHeight]);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setDimension([window.innerWidth, window.innerHeight]);
      });
    };
  }, []);

  return dimension;
}

export function objectsEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function getLeagueIcon(leagueName: string, screenSize: number) {
  const size = screenSize > 700 || screenSize === 0 ? 100 : 75;
  const color = stc(leagueName);
  const possibleLeagueIcons = [
    <GiVibratingShield key={'vibratingShield'} size={size} color={color} />,
    <GiSlashedShield key={'GiSlashedShield'} size={size} color={color} />,
    <GiSpikedShield key={'GiSpikedShield'} size={size} color={color} />,
    <GiEyeShield key={'vibratingShield'} size={size} color={color} />,
    <GiFireShield key={'GiFireShield'} size={size} color={color} />,
    <GiEnergyShield key={'GiEnergyShield'} size={size} color={color} />,
    <GiEdgedShield key={'GiEdgedShield'} size={size} color={color} />,
    <GiDragonShield key={'GiDragonShield'} size={size} color={color} />,
    <GiBoltShield key={'GiBoltShield'} size={size} color={color} />,
    <GiBorderedShield key={'GiBorderedShield'} size={size} color={color} />,
    <GiMagicShield key={'GiMagicShield'} size={size} color={color} />,
  ];

  let letterSum = 0;
  leagueName.split('').forEach((char) => (letterSum += char.toString().charCodeAt(0)));
  let charCode = Math.round(
    (letterSum / possibleLeagueIcons.length + (leagueName.length % 9)) % 11,
  );

  charCode === 11 ? charCode-- : (charCode += 0);

  return possibleLeagueIcons[charCode];
}
