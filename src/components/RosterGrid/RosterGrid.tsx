import { Team } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import { calculateStandings, useWindowResize } from '@services/helpers';
import React from 'react';
import { RosterCard } from '../RosterCard/RosterCard';

export interface RosterGridProps {
  league: any;
  week: number;
  leagueId: any;
}

const createRosterCard = (team: Team, leagueID: any, week: number) => {
  return <RosterCard team={team} leagueID={leagueID} week={week} />;
};

export default function RosterGrid(props: RosterGridProps) {
  const windowSize: number[] = useWindowResize();
  let span;
  if (windowSize[0] > 1000 || windowSize[0] === 0) span = 4;
  else if (windowSize[0] > 700) span = 6;
  else span = 8;
  return (
    <Grid>
      {calculateStandings(props.league, props.week).map((team) => {
        return (
          <>
            <Grid.Col span={span}>{createRosterCard(team, props.leagueId, props.week)}</Grid.Col>
          </>
        );
      })}
    </Grid>
  );
}
