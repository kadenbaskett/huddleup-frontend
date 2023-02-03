import { Team } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import { calculateStandings } from '@services/helpers';
import React, { useEffect, useState } from 'react';
import { RosterCard } from '../RosterCard/RosterCard';

export interface RosterGridProps {
  league: any;
  week: number;
  leagueId: any;
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const createRosterCard = (team: Team, leagueID: any, week: number) => {
  return <RosterCard team={team} leagueID={leagueID} week={week} />;
};

export default function RosterGrid(props: RosterGridProps) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      console.log('windowDimensions', windowDimensions);
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
