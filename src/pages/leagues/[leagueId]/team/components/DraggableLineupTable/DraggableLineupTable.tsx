import { DndContext } from '@dnd-kit/core';
import { Grid, SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export interface TableData {
  players: any;
}
export function DraggableLineupTable(props: TableData) {
  const BRpositions = ['TE', 'RB', 'WR', 'K'];

  const players = props.players;
  // TODO: don't put roster players in bench positions
  const benchedQB = props.players
    .filter(({ player }) => player.position === 'QB')
    .map((player) => {
      return player.id;
    });
  const benchedBR = props.players
    .filter(({ player }) => BRpositions.includes(player.position))
    .map((player) => {
      return player.id;
    });
  const [QBchildren, setQBchildren] = useState([]);
  const [QBbench, setQBbench] = useState([...benchedQB]);
  const [BRchildren, setBRchildren] = useState([]);
  const [BRbench, setBRbench] = useState([...benchedBR]);

  const addPlayer = (playerId: string, type: string, position: string) => {
    console.log('position', position);
    const currentQBchildren = [...QBchildren];
    const currentQBbench = [...QBbench];
    const currentBRchildren = [...BRchildren];
    const currentBRbench = [...BRbench];

    if (type === 'QB' && !QBchildren.includes(playerId) && position === 'QB') {
      currentQBchildren.push(playerId);
      setQBchildren(currentQBchildren);
      setQBbench(currentQBbench.filter((e) => e !== playerId));
    } else if (type === 'QB-Bench' && !QBbench.includes(playerId) && position === 'QB') {
      currentQBbench.push(playerId);
      setQBbench(currentQBbench);
      setQBchildren(currentQBchildren.filter((e) => e !== playerId));
    } else if (
      type === 'BR' &&
      !BRchildren.includes(playerId) &&
      (position === 'TE' || position === 'RB' || position === 'WR' || position === 'K')
    ) {
      currentBRchildren.push(playerId);
      setBRchildren(currentBRchildren);
      setBRbench(currentBRbench.filter((e) => e !== playerId));
    } else if (
      type === 'BR-Bench' &&
      !BRbench.includes(playerId) &&
      (position === 'TE' || position === 'RB' || position === 'WR' || position === 'K')
    ) {
      currentBRbench.push(playerId);
      setBRbench(currentBRbench);
      setBRchildren(currentBRchildren.filter((e) => e !== playerId));
    }
  };

  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over) return;
    const { position } = players.find(({ id }) => id === active.id).player;
    addPlayer(active.id, over.id, position);
  }

  const weeks = new Array(18);
  for (let i = 1; i <= 18; i++) {
    weeks[i - 1] = { label: i.toString(), value: i.toString() };
  }

  return (
    <>
      <div className='text-xl font-varsity'>Week:</div>
      <div className='p-3'>
        <SegmentedControl data={weeks} />
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        {players.map(({ player, id }) => {
          if (
            !QBchildren.includes(id) &&
            !QBbench.includes(id) &&
            !BRchildren.includes(id) &&
            !BRbench.includes(id)
          ) {
            return (
              <Draggable key={id} id={id} player={player}>
                {player.first_name}
              </Draggable>
            );
          } else return <></>;
        })}
        {/* QuarterBacks */}
        <Grid>
          <Grid.Col span={6}>
            <div className='text-xl font-varsity text-darkBlue'>Quarterbacks:</div>
            <Droppable key={'QB'} id={'QB'}>
              {QBchildren.map((child) => {
                return (
                  <Draggable
                    key={child}
                    id={child}
                    player={players.find(({ id }) => id === child).player}
                  >
                    {child}
                  </Draggable>
                );
              })}
            </Droppable>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className='text-xl font-varsity text-darkBlue'>Bench:</div>
            <Droppable key={'QB-Bench'} id={'QB-Bench'}>
              {QBbench.map((child) => {
                return (
                  <Draggable
                    key={child}
                    id={child}
                    player={players.find(({ id }) => id === child).player}
                  >
                    {child}
                  </Draggable>
                );
              })}
            </Droppable>
          </Grid.Col>
        </Grid>
        {/* Backs and Recievers */}
        <Grid>
          <Grid.Col span={6}>
            <div className='text-xl font-varsity text-darkBlue'>Backs and Recievers:</div>
            <Droppable key={'BR'} id={'BR'}>
              {BRchildren.map((child) => {
                return (
                  <Draggable
                    key={child}
                    id={child}
                    player={players.find(({ id }) => id === child).player}
                  >
                    {child}
                  </Draggable>
                );
              })}
            </Droppable>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className='text-xl font-varsity text-darkBlue'>Bench:</div>
            <Droppable key={'BR-Bench'} id={'BR-Bench'}>
              {BRbench.map((child) => {
                return (
                  <Draggable
                    key={child}
                    id={child}
                    player={players.find(({ id }) => id === child).player}
                  >
                    {child}
                  </Draggable>
                );
              })}
            </Droppable>
          </Grid.Col>
        </Grid>
      </DndContext>
    </>
  );
}
