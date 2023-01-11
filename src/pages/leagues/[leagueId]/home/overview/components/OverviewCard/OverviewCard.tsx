import { Grid } from '@mantine/core';
import React from 'react';
import { Activity, Team } from '../../types';
import { RecentActivityTable } from '../RecentActivityTable/RecentActivityTable';
import Top5StandingTable from '../Top5StandingTable/Top5StandingTable';

export interface OverviewCardProps {
  activities: Activity[];
  teams: Team[];
}

export default function OverviewCard(props: OverviewCardProps) {
  return (
    <div>
      <Grid columns={10}>
        <Grid.Col span={7}>
          <RecentActivityTable activities={props.activities} />
        </Grid.Col>
        <Grid.Col span={3}>
          <Top5StandingTable teams={props.teams} />
        </Grid.Col>
      </Grid>
    </div>
  );
}
