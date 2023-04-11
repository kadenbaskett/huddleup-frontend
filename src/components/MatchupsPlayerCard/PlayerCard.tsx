import { Player } from '@components/DraggableLineupTable/Draggable';
import { fantasyPoints, useWindowResize } from '@services/helpers';

export interface PlayerCardProps {
  player: Player;
  currentWeek: Number;
}

export function PlayerCard({ player, currentWeek }) {
  const windowSize: number[] = useWindowResize();

  const stats = player?.player_game_stats.find((stat) => stat.game.week === currentWeek);
  const actualPoints = fantasyPoints(stats);
  const projection = player?.player_projections.find((proj) => proj.game.week === currentWeek);
  const projPoints = fantasyPoints(projection);
  return (
    <div className='p-1'>
      <div className='bg-white border-white hover:border-orange border-2 rounded-xl p-1'>
        <div className='flex'>
          <div>
            <img src={player.photo_url} width={30}></img>
          </div>
          <div className='pl-3'>
            <div className='text-sm font-openSans text-darkBlue'>
              {player.first_name} {player.last_name}
            </div>
            <div className='text-xs font-openSans text-orange'>
              <div>
                {player.current_nfl_team ? player.current_nfl_team.city : ''}{' '}
                {player.current_nfl_team ? player.current_nfl_team.name : ''} {player.position}
              </div>
            </div>
          </div>
          {(windowSize[0] > 600 || windowSize[0] === 0) && (
            <>
              <div className='pl-3'>
                <div className='text-xs'>Projection:</div>
                <div className='text-orange'>{projPoints}</div>
              </div>
              <div className='pl-3'>
                <div className='text-xs'>Actual:</div>
                <div className='text-orange'>{actualPoints}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
