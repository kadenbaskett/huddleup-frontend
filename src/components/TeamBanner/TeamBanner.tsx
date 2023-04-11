import { Grid } from '@mantine/core';
import { createManagerString } from '@services/helpers';
import { GiAmericanFootballHelmet } from 'react-icons/gi';
import stc from 'string-to-color';

export interface TeamBannerProps {
  team: any;
  name: string;
  rank?: string;
}

export function TeamBanner(props: TeamBannerProps) {
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <Grid>
        <Grid.Col span={2}>
          <GiAmericanFootballHelmet size={75} color={stc(props.name)} />
        </Grid.Col>
        <Grid.Col span={10}>
          <div className='text-6xl font-varsity'>{props.name}</div>
          <div className='text-xl font-openSans text-orange'>
            {createManagerString(props.team.managers)}
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
