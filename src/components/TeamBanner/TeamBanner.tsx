import { Grid } from '@mantine/core';
import { createManagerString, useWindowResize } from '@services/helpers';
import { GiAmericanFootballHelmet } from 'react-icons/gi';

export interface TeamBannerProps {
  team: any;
  name: string;
  rank?: string;
}

export function TeamBanner(props: TeamBannerProps) {
  const windowSize = useWindowResize();

  windowSize[0] > 950 ||
    (windowSize[0] === 0 && (
      <div className='bg-white rounded-xl hover:drop-shadow-md'>
        <Grid>
          <Grid.Col span={2}>
            <GiAmericanFootballHelmet size={75} color='' />
          </Grid.Col>
          <Grid.Col span={10}>
            <div className='text-6xl font-varsity text-darkBlue'>{props.name}</div>
            <div className='text-xl font-openSans text-orange'>
              {createManagerString(props.team.managers)}
            </div>
          </Grid.Col>
        </Grid>
      </div>
    ));
}
