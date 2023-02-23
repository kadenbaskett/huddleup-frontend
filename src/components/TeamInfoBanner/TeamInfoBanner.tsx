import { League, Team } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import { getTeamScore } from '@services/helpers';
import { useEffect, useState } from 'react';

export interface TeamInfoBannerProps {
  league: League;
  week: number;
  team: Team;
}
export function TeamInfoBanner(props: TeamInfoBannerProps) {
  const [otherTeam, setOtherTeam] = useState(undefined);
  const [homeScore, setHomeScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [nextTeamName, setNextTeamName] = useState('');
  useEffect(() => {
    const newMatchup = props.league?.matchups.find((matchup) => {
      return (
        matchup.week === props.week &&
        (matchup.away_team_id === props.team.id || matchup.home_team_id === props.team.id)
      );
    });
    const nextMatchup = props.league?.matchups.find((matchup) => {
      return (
        matchup.week === props.week + 1 &&
        (matchup.away_team_id === props.team.id || matchup.home_team_id === props.team.id)
      );
    });

    if (nextMatchup.home_team_id === props.team.id) {
      setNextTeamName(nextMatchup.away_team.name);
    } else {
      setNextTeamName(nextMatchup.home_team.name);
    }

    const newUserRoster = props.team?.rosters.find((roster) => {
      return roster.week === props.week;
    });
    const otherTeamId =
      newMatchup?.home_team_id === props.team?.id
        ? newMatchup?.away_team_id
        : newMatchup?.home_team_id;
    const newOtherTeam = props.league?.teams.find((t) => {
      return t.id === otherTeamId;
    });

    setOtherTeam(newOtherTeam);
    const newOtherRoster = newOtherTeam?.rosters.find((roster) => {
      return roster.week === props.week;
    });

    setHomeScore(getTeamScore(newUserRoster, props.week));

    setOtherScore(getTeamScore(newOtherRoster, props.week));
  }, [props.week]);

  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <div className='px-3'>
        <Grid>
          <Grid.Col span={6} className='px-3'>
            <div className='text-xl font-openSans font-bold'>Previous Matchup</div>
            <div className='text-xl font-openSans'>
              {props.team?.name} - {homeScore}
            </div>
            <div className='text-xl font-openSans'>
              {otherTeam?.name} - {otherScore}
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className='text-xl font-openSans font-bold'>Current Matchup</div>
            <div className='text-xl font-openSans'>{props.team?.name}</div>
            <div className='text-xl font-openSans'>{nextTeamName}</div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
