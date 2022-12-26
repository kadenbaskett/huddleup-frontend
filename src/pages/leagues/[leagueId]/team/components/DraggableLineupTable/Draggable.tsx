import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Grid } from '@mantine/core';

export interface Player {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  photo_url: string;
  current_nfl_team: any;
}

export interface DraggableProps {
  id: string;
  key: string;
  children: any;
  player: Player;
}

export function Draggable(props: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className='p-1'>
        <div className='bg-white rounded-xl p-1 w-60'>
          <Grid>
            <Grid.Col span={3}>
              <img src={props.player.photo_url} width={30}></img>
            </Grid.Col>
            <Grid.Col span={9}>
              <div className='text-md font-openSans text-darkBlue'>
                {props.player.first_name} {props.player.last_name}
              </div>
              <div className='text-sm font-openSans text-orange'>
                <div>
                  {props.player.current_nfl_team ? props.player.current_nfl_team.city : ''}{' '}
                  {props.player.current_nfl_team ? props.player.current_nfl_team.name : ''}
                  {` (${props.player.position})`}
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </button>
  );
}
