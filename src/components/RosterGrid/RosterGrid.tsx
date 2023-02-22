import { Team } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import { calculateStandings } from '@services/helpers';
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
  return (
    <Grid>
      {calculateStandings(props.league, props.week).map((team) => {
        return (
          <>
            <Grid.Col span={4}>{createRosterCard(team, props.leagueId, props.week)}</Grid.Col>
          </>
        );
      })}
    </Grid>
  );
}
