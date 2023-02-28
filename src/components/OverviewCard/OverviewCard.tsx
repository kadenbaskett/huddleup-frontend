import { Grid } from '@mantine/core';
import { useWindowResize } from '@services/helpers';
import React from 'react';
import { Activity, Team } from '../../types';
import { RecentActivityTable } from '../RecentActivityTable/RecentActivityTable';
import Top5StandingTable from '../Top5StandingTable/Top5StandingTable';

export interface OverviewCardProps {
  activities: Activity[];
  teams: Team[];
}

export default function OverviewCard(props: OverviewCardProps) {
  const windowSize = useWindowResize();
  let top5Span;
  let recentActivityTableSpan;
  if (windowSize[0] > 800) {
    recentActivityTableSpan = 7;
    top5Span = 3;
  } else {
    recentActivityTableSpan = 10;
    top5Span = 10;
  }

  return (
    <div>
      <Grid columns={10}>
        <Grid.Col span={recentActivityTableSpan}>
          <RecentActivityTable activities={props.activities} />
        </Grid.Col>
        <Grid.Col span={top5Span}>
          <Top5StandingTable teams={props.teams} />
        </Grid.Col>
      </Grid>
    </div>
  );
}
