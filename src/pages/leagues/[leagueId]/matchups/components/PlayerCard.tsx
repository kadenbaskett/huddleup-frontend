import { Grid } from '@mantine/core';
import { fantasyPoints } from '@services/helpers';
import { Player } from '../../team/[teamId]/components/DraggableLineupTable/Draggable';

export interface PlayerCardProps {
  player: Player;
  currentWeek: Number;
}

export function PlayerCard({ player, currentWeek }) {
  const stats = player?.player_game_stats.find((stat) => stat.game.week === currentWeek);
  const actualPoints = fantasyPoints(stats);
  const projection = player?.player_projections.find((proj) => proj.game.week === currentWeek);
  const projPoints = fantasyPoints(projection);
  return (
    <div className='p-1'>
      <div className='bg-white border-white hover:border-orange border-2 rounded-xl p-1'>
        <Grid>
          <Grid.Col span={2}>
            <img src={player.photo_url} width={30}></img>
          </Grid.Col>
          <Grid.Col span={5}>
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
          <Grid.Col span={3}>
            <div className='text-sm'>Projection:</div>
            <div className='text-orange'>{projPoints}</div>
          </Grid.Col>
          <Grid.Col span={2}>
            <div className='text-sm'>Actual:</div>
            <div className='text-orange'>{actualPoints}</div>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
