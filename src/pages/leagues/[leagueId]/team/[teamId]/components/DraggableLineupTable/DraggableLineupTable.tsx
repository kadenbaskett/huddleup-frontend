import { DndContext } from '@dnd-kit/core';
import { Grid, SegmentedControl } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export interface TableData {
  rosters: any;
  currentWeek: string;
  disabled: boolean;
}
export function DraggableLineupTable({ rosters, currentWeek, disabled }: TableData) {
  const [players, setPlayers] = useState([]);
  const [week, setWeek] = useState(currentWeek);
  const [QB, setQB] = useState([]); // 1 QB
  const [WR, setWR] = useState([]); // 2 WR
  const [RB, setRB] = useState([]); // 2 RB
  const [TE, setTE] = useState([]); // 1 TE
  const [FLEX, setFLEX] = useState([]); // 1 FLEX
  const [bench, setBench] = useState([]);
  useEffect(() => {
    const players = rosters.find((roster) => roster.week.toString() === week)?.players;
    setPlayers(players);
    const activeQB = players
      .filter(
        ({ position, player }) =>
          player.position === 'QB' && position !== 'BE' && position !== 'FLEX',
      )
      .map((player) => {
        return player.id;
      });
    setQB(activeQB);
    const activeWR = players
      .filter(
        ({ position, player }) =>
          player.position === 'WR' && position !== 'BE' && position !== 'FLEX',
      )
      .map((player) => {
        return player.id;
      });
    setWR(activeWR);
    const activeRB = players
      .filter(
        ({ position, player }) =>
          player.position === 'RB' && position !== 'BE' && position !== 'FLEX',
      )
      .map((player) => {
        return player.id;
      });
    setRB(activeRB);
    const activeTE = players
      .filter(
        ({ position, player }) =>
          player.position === 'TE' && position !== 'BE' && position !== 'FLEX',
      )
      .map((player) => {
        return player.id;
      });
    setTE(activeTE);
    const activeFLEX = players
      .filter(({ position }) => position === 'FLEX')
      .map((player) => {
        return player.id;
      });
    setFLEX(activeFLEX);
    const benched = players
      .filter(({ position }) => position === 'BE')
      .map((player) => {
        return player.id;
      });
    setBench(benched);
  }, [week]);

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
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (type === 'WR' && !WR.includes(playerId) && position === 'WR') {
      currentWR.push(playerId);
      setWR(currentWR);
      setBench(currentBench.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (type === 'RB' && !RB.includes(playerId) && position === 'RB') {
      currentRB.push(playerId);
      setRB(currentRB);
      setBench(bench.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (type === 'TE' && !TE.includes(playerId) && position === 'TE') {
      currentTE.push(playerId);
      setTE(currentTE);
      setBench(bench.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (type === 'FLEX' && !FLEX.includes(playerId)) {
      currentFLEX.push(playerId);
      setFLEX(currentFLEX);
      setQB(currentQB.filter((e) => e !== playerId));
      setWR(currentWR.filter((e) => e !== playerId));
      setRB(currentRB.filter((e) => e !== playerId));
      setTE(currentTE.filter((e) => e !== playerId));
      setBench(bench.filter((e) => e !== playerId));
    } else if (type === 'Bench' && !bench.includes(playerId)) {
      currentBench.push(playerId);
      setBench(currentBench);
      setQB(currentQB.filter((e) => e !== playerId));
      setWR(currentWR.filter((e) => e !== playerId));
      setRB(currentRB.filter((e) => e !== playerId));
      setTE(currentTE.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    }
  };
  // drop player over container logic
  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over) return;
    const { position } = players.find(({ id }) => id === active.id).player;
    addPlayer(active.id, over.id, position);
  }
  // generate the weeks for the segmneted control
  const weeks = new Array(Number(currentWeek) - 1);
  for (let i = 1; i <= Number(currentWeek); i++) {
    weeks[i - 1] = { label: i.toString(), value: i.toString() };
  }
  return (
    <>
      <div className='text-xl font-varsity'>Week:</div>
      <div className='p-3'>
        <SegmentedControl fullWidth value={week} data={weeks} onChange={(e) => setWeek(e)} />
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
