import { Team } from '@interfaces/league.interface';
import { Grid } from '@mantine/core';
import { createManagerString } from '@services/helpers';
import { GiAmericanFootballHelmet } from 'react-icons/gi';

export interface ActiveDrafterProps {
  team: Team;
  time: number;
}
export default function ActiveDrafter({ team, time }: ActiveDrafterProps) {
  const seconds = time % 60;
  return (
    <div
      className={`relative z-20 bg-white rounded-xl sm:h-auto border-4 ${
        time < 10 ? 'border-red' : 'border-green'
      } hover:drop-shadow-md w-full md:w-1/2 xl:w-1/4`}
    >
      <div className='grid content-center h-full'>
        <Grid columns={16}>
          <Grid.Col span={3}>
            <div className='grid place-items-center'>
              <div className={`text-7xl ${time < 10 ? 'text-red' : 'text-green'} `}>
                <GiAmericanFootballHelmet />
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={9}>
            <div className='grid place-items-start'>
              <div className={`text-4xl font-varsity ${time < 10 ? 'text-red' : 'text-green'}`}>
                {team.name}
              </div>
              <div className='text-sm text-darkBlue'>{createManagerString(team.managers)}</div>
            </div>
          </Grid.Col>
          <Grid.Col span={3}>
            <div className='grid place-items-center'>
              <div className={`text-5xl font-varsity ${time < 10 ? 'text-red' : 'text-green'}`}>
                0:{seconds}
              </div>
              <div className={`text-xl font-varsity ${time < 10 ? 'text-red' : 'text-green'}`}>
                seconds
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
