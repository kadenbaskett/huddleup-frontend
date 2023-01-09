import { Grid } from '@mantine/core';
import Image from 'next/image';
import Shield from '../../../../../../public/assets/shield.png';

export interface TeamBannerProps {
  name: string;
  members: string[];
  rank?: string;
}
export function TeamBanner(props: TeamBannerProps) {
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <Grid>
        <Grid.Col span={2}>
          <Image width={120} src={Shield} alt={props.name + '-image'} />
        </Grid.Col>
        <Grid.Col span={10}>
          <div className='text-6xl font-varsity'>{props.name}</div>
          <div className='text-xl font-openSans text-orange'>{props.members.join(', ')}</div>
        </Grid.Col>
      </Grid>
    </div>
  );
}
