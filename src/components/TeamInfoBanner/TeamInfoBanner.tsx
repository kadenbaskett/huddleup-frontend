import { Grid } from '@mantine/core';

export interface TeamInfoBannerProps {
  teamName: string;
  lastMatchupOpponentName: string;
  lastMatchupOpponentScore: Number;
  lastMatchupPersonalScore: Number;
  nextMatchupOpponentName: string;
}
export function TeamInfoBanner(props: TeamInfoBannerProps) {
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <div className='p-3'>
        <Grid>
          <Grid.Col span={6}>
            <div className='text-xl font-openSans font-bold'>Previous Matchup</div>
            <div className='text-xl font-openSans'>
              {props.teamName} - {props.lastMatchupPersonalScore}
            </div>
            <div className='text-xl font-openSans'>
              {props.lastMatchupOpponentName} - {props.lastMatchupOpponentScore}
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className='text-xl font-openSans font-bold'>Current Matchup</div>
            <div className='text-xl font-openSans'>{props.teamName}</div>
            <div className='text-xl font-openSans'>{props.nextMatchupOpponentName}</div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
