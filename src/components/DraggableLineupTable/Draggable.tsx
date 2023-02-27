import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Grid } from '@mantine/core';
import { useWindowResize } from '@services/helpers';

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
  disabled: boolean;
}

export function Draggable(props: DraggableProps) {
  const windowSize: number[] = useWindowResize();
  let cardWidth = 0;
  let imageSpan = 0;
  let nameSpan = 0;

  if (windowSize[0] > 800 || windowSize[0] === 0) {
    cardWidth = 60;
    imageSpan = 3;
    nameSpan = 9;
  } else {
    cardWidth = 30;
    imageSpan = 12;
    nameSpan = 12;
  }

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      ...props.player,
    },
    disabled: props.disabled,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className='p-1'>
        <div
          className={`bg-white border-white hover:border-orange border-2 rounded-xl p-1 w-${cardWidth}`}
        >
          <Grid align={'center'} justify={'center'}>
            <Grid.Col span={imageSpan}>
              <img src={props.player.photo_url} width={30}></img>
            </Grid.Col>
            <Grid.Col span={nameSpan}>
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
