import { League } from '@interfaces/league.interface';
import { Table } from '@mantine/core';
import { createManagerString, getTeamScore } from '@services/helpers';
export interface OtherMatchupsProps {
  league: League;
  userTeamId: Number;
  week: Number;
}
export function OtherMatchups({ league, userTeamId, week }: OtherMatchupsProps) {
  const thisWeekMatchups = league.matchups.filter((matchup) => matchup.week === week);
  return (
    <>
      <div className='text-2xl font-varsity text-darkBlue'>Other Matchups</div>
      <Table>
        <thead>
          <tr>
            <th>Home Team</th>
            <th>Team Managers</th>
            <th>Score</th>
            <th>Score</th>
            <th>Team Managers</th>
            <th>Away Team</th>
          </tr>
        </thead>
        <tbody>
          {thisWeekMatchups.map((matchup) => {
            return (
              <tr key={matchup.id}>
                <td>{matchup.home_team.name}</td>
                <td>
                  <div className='text-orange'>
                    {createManagerString(matchup.home_team.managers)}
                  </div>
                </td>
                <td>
                  {getTeamScore(
                    league.teams
                      .find((team) => team.id === matchup.home_team_id)
                      .rosters.find((roster) => roster.week === week),
                    week,
                  )}
                </td>
                <td>
                  {getTeamScore(
                    league.teams
                      .find((team) => team.id === matchup.away_team_id)
                      .rosters.find((roster) => roster.week === week),
                    week,
                  )}
                </td>
                <td>
                  {' '}
                  <div className='text-orange'>
                    {createManagerString(matchup.away_team.managers)}
                  </div>
                </td>
                <td>{matchup.away_team.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
