import { Player } from '@components/DraggableLineupTable/Draggable';
import { Grid } from '@mantine/core';
import { fantasyPoints, useWindowResize } from '@services/helpers';

export interface PlayerCardProps {
  player: Player;
  currentWeek: Number;
}

export function PlayerCard({ player, currentWeek }) {
  const windowSize: number[] = useWindowResize();

  let imageSpan = 0;
  let nameSpan = 0;
  let projectionSpan = 0;
  let actualSpan = 0;

  if (windowSize[0] > 800 || windowSize[0] === 0) {
    imageSpan = 2;
    nameSpan = 5;
    projectionSpan = 3;
    actualSpan = 2;
  } else {
    imageSpan = 12;
    nameSpan = 12;
    projectionSpan = 12;
    actualSpan = 12;
  }

  const stats = player?.player_game_stats.find((stat) => stat.game.week === currentWeek);
  const actualPoints = fantasyPoints(stats);
  const projection = player?.player_projections.find((proj) => proj.game.week === currentWeek);
  const projPoints = fantasyPoints(projection);
  return (
    <div className='p-1'>
      <div className='bg-white border-white hover:border-orange border-2 rounded-xl p-1'>
        <Grid>
          <Grid.Col span={imageSpan}>
            <img src={player.photo_url} width={30}></img>
          </Grid.Col>
          <Grid.Col span={nameSpan}>
            <div className='text-md font-openSans text-darkBlue'>
              {player.first_name} {player.last_name}
            </div>
            <div className='text-sm font-openSans text-orange'>
              <div>
                {player.current_nfl_team ? player.current_nfl_team.city : ''}{' '}
                {player.current_nfl_team ? player.current_nfl_team.name : ''} {player.position}
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={projectionSpan}>
            <div className='text-sm'>Projection:</div>
            <div className='text-orange'>{projPoints}</div>
          </Grid.Col>
          <Grid.Col span={actualSpan}>
            <div className='text-sm'>Actual:</div>
            <div className='text-orange'>{actualPoints}</div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
