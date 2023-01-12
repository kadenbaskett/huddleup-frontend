import { DndContext } from '@dnd-kit/core';
import { Grid, SegmentedControl } from '@mantine/core';
import { useState } from 'react';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export interface TableData {
  players: any;
}
export function DraggableLineupTable(props: TableData) {
  const players = props.players;
  const activeQB = props.players
    .filter(
      ({ position, player }) =>
        player.position === 'QB' && position !== 'BE' && position !== 'FLEX',
    )
    .map((player) => {
      return player.id;
    });
  const activeWR = props.players
    .filter(
      ({ position, player }) =>
        player.position === 'WR' && position !== 'BE' && position !== 'FLEX',
    )
    .map((player) => {
      return player.id;
    });
  const activeRB = props.players
    .filter(
      ({ position, player }) =>
        player.position === 'RB' && position !== 'BE' && position !== 'FLEX',
    )
    .map((player) => {
      return player.id;
    });
  const activeTE = props.players
    .filter(
      ({ position, player }) =>
        player.position === 'TE' && position !== 'BE' && position !== 'FLEX',
    )
    .map((player) => {
      return player.id;
    });
  const activeFLEX = props.players
    .filter(({ position }) => position === 'FLEX')
    .map((player) => {
      return player.id;
    });
  const benched = props.players
    .filter(({ position, player }) => position === 'BE')
    .map((player) => {
      return player.id;
    });
  const [QB, setQB] = useState([...activeQB]); // 1 QB
  const [WR, setWR] = useState([...activeWR]); // 2 WR
  const [RB, setRB] = useState([...activeRB]); // 2 RB
  const [TE, setTE] = useState([...activeTE]); // 1 TE
  const [FLEX, setFLEX] = useState([...activeFLEX]); // 1 FLEX
  const [bench, setBench] = useState([...benched]);

  const addPlayer = (playerId: string, type: string, position: string) => {
    const currentQB = [...QB];
    const currentWR = [...WR];
    const currentRB = [...RB];
    const currentTE = [...TE];
    const currentFLEX = [...FLEX];
    const currentBench = [...bench];

    if (type === 'QB' && !QB.includes(playerId) && position === 'QB') {
      currentQB.push(playerId);
      setQB(currentQB);
      setBench(bench.filter((e) => e !== playerId));
    } else if (type === 'WR' && !WR.includes(playerId)) {
      currentWR.push(playerId);
      setWR(currentWR);
      setBench(currentBench.filter((e) => e !== playerId));
    } else if (type === 'RB' && !RB.includes(playerId)) {
      currentRB.push(playerId);
      setRB(currentRB);
      setBench(bench.filter((e) => e !== playerId));
    } else if (type === 'TE' && !TE.includes(playerId)) {
      currentTE.push(playerId);
      setTE(currentTE);
      setBench(bench.filter((e) => e !== playerId));
    } else if (type === 'FLEX' && !FLEX.includes(playerId)) {
      currentFLEX.push(playerId);
      setFLEX(currentFLEX);
      setBench(bench.filter((e) => e !== playerId));
    } else if (type === 'Bench' && !bench.includes(playerId)) {
      currentBench.push(playerId);
      setBench(currentBench);
      setWR(currentWR.filter((e) => e !== playerId));
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
        {/* QuarterBacks */}
        <Grid>
          <Grid.Col span={7}>
            <div className='text-xl font-varsity text-darkBlue'>Quarterback:</div>
            <Droppable key={'QB'} id={'QB'}>
              {QB.map((child) => {
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
            <div className='text-xl font-varsity text-darkBlue'>Wide Recievers:</div>
            <Droppable key={'WR'} id={'WR'}>
              {WR.map((child) => {
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
            <div className='text-xl font-varsity text-darkBlue'>Running Backs:</div>
            <Droppable key={'RB'} id={'RB'}>
              {RB.map((child) => {
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
            <div className='text-xl font-varsity text-darkBlue'>Tight End:</div>
            <Droppable key={'TE'} id={'TE'}>
              {TE.map((child) => {
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
            <div className='text-xl font-varsity text-darkBlue'>Flex:</div>
            <Droppable key={'FLEX'} id={'FLEX'}>
              {FLEX.map((child) => {
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
          <Grid.Col span={5}>
            <div className='text-xl font-varsity text-darkBlue'>Bench:</div>
            <Droppable key={'Bench'} id={'Bench'}>
              {bench.map((child) => {
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
