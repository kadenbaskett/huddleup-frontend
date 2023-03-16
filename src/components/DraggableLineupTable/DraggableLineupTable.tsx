import AddDropPlayerConfirmPopup from '@components/AddDropPlayerConfirmPopup/AddDropPlayerConfirmPopup';
import AddDropPlayerPopup from '@components/AddDropPlayerPopup/AddDropPlayerPopup';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import TradePlayerPopup from '@components/TradePlayerPopup/TradePlayerPopup';
import { DndContext } from '@dnd-kit/core';
import { Grid, SegmentedControl } from '@mantine/core';
import { editLineup } from '@services/apiClient';
import CONFIG from '@services/config';
import { getTeamThatOwnsPlayer } from '@services/helpers';
import { StoreState } from '@store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

export interface TableData {
  rosters: any;
  currentWeek: string;
  disabled: boolean;
}
export function DraggableLineupTable({ rosters, currentWeek, disabled }: TableData) {
  // Application state
  const league = useSelector((state: StoreState) => state.league.league);
  const myTeam = useSelector((state: StoreState) => state.league.userTeam);
  const user = useSelector((state: StoreState) => state.user.userInfo);

  const [players, setPlayers] = useState([]);
  const [week, setWeek] = useState(currentWeek);
  const [QB, setQB] = useState([]); // 1 QB
  const [WR, setWR] = useState([]); // 2 WR
  const [RB, setRB] = useState([]); // 2 RB
  const [TE, setTE] = useState([]); // 1 TE
  const [FLEX, setFLEX] = useState([]); // 1 FLEX
  const [bench, setBench] = useState([]);
  const [lineupChange, setLineupChange] = useState(false);

  // Trade popup
  const [tradePopupOpen, setTradePopupOpen] = useState(false);
  const [tradeRoster, setTradeRoster] = useState(null);

  // Are we adding or dropping the player?
  const [addingPlayer, setAddingPlayer] = useState(false);

  // Confirm popup
  const [addDropConfirmPopupOpen, setAddDropConfirmPopupOpen] = useState(false);

  // Add Drop popup
  const [addDropPopupOpen, setAddDropPopupOpen] = useState(false);

  // Player popup
  const [playerPopupOpen, setPlayerPopupOpen] = useState(false);

  // Used for all popups
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // On close methods of popups
  const onTradePopupClose = () => {
    setTradePopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropPopupClose = () => {
    setAddDropPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropConfirmClose = () => {
    setAddDropConfirmPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onPlayerPopupClose = () => {
    setPlayerPopupOpen(false);
  };

  // When a player is clicked
  const onPlayerClick = (p) => {
    setSelectedPlayer(p);
    setPlayerPopupOpen(true);
  };

  // Takes the necessary action to add/drop/trade for player
  const takePlayerAction = (player) => {
    setSelectedPlayer(player);
    const playerTeam = getTeamThatOwnsPlayer(player, Number(currentWeek));
    const myRoster = getMyRoster();
    const isMyPlayer = playerTeam?.id === myTeam.id;

    // Nobody owns the player -> they are a free agent
    if (!playerTeam) {
      // TODO use league settings instead of CONFIG
      // No need to drop a player as part of the transaction if your roster isn't full
      if (myRoster.players.length < CONFIG.maxRosterSize) {
        setAddingPlayer(true);
        setAddDropConfirmPopupOpen(true);
      } else {
        setAddDropPopupOpen(true);
      }
    }
    // I own the player - so drop them
    else if (isMyPlayer) {
      setAddingPlayer(false);
      setAddDropConfirmPopupOpen(true);
    }
    // Another team owns this player - so propose a trade
    else {
      const tradeTeam = league.teams.find((t) => t.id === playerTeam.id);
      const tradeRoster = tradeTeam.rosters.find((r) => r.week === currentWeek);

      setTradeRoster(tradeRoster);
      setTradePopupOpen(true);
    }
  };

  const getMyRoster = () => {
    return myTeam ? myTeam.rosters.find((r) => r.week === Number(currentWeek)) : [];
  };

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

  useEffect(() => {
    void updateLineup();
  }, [lineupChange, rosters]);

  const updateLineup = async () => {
    const positions = ['TE', 'RB', 'WR', 'QB', 'BE', 'FLEX'];

    for (const position of positions) {
      let playersInPosition = [];

      switch (position) {
        case 'TE':
          playersInPosition = TE;
          break;
        case 'RB':
          playersInPosition = RB;
          break;
        case 'WR':
          playersInPosition = WR;
          break;
        case 'QB':
          playersInPosition = QB;
          break;
        case 'FLEX':
          playersInPosition = FLEX;
          break;
        case 'BE':
          playersInPosition = bench;
          break;
      }

      // For every player in the UI, make sure their roster player obj has the correct position
      const outOfPosition = playersInPosition.filter((p) => p.position !== position);
      for (const rosterPlayerId of outOfPosition) {
        await editLineup(rosterPlayerId, position);
      }
    }
  };

  const addPlayer = (player, playerId: string, type: string, position: string, event) => {
    const currentQB = [...QB];
    const currentWR = [...WR];
    const currentRB = [...RB];
    const currentTE = [...TE];
    const currentFLEX = [...FLEX];
    const currentBench = [...bench];

    const starterLimits = {
      QB: 1,
      RB: 2,
      WR: 2,
      TE: 1,
      FLEX: 1,
    };

    const flexPositions = ['RB', 'WR', 'TE'];
    let changeMade = false;
    if (
      type === 'QB' &&
      !QB.includes(playerId) &&
      position === 'QB' &&
      QB.length < starterLimits.QB
    ) {
      changeMade = true;
      currentQB.push(playerId);
      setQB(currentQB);
      setBench(bench.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (
      type === 'WR' &&
      !WR.includes(playerId) &&
      position === 'WR' &&
      WR.length < starterLimits.WR
    ) {
      changeMade = true;
      currentWR.push(playerId);
      setWR(currentWR);
      setBench(currentBench.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (
      type === 'RB' &&
      !RB.includes(playerId) &&
      position === 'RB' &&
      RB.length < starterLimits.RB
    ) {
      changeMade = true;
      currentRB.push(playerId);
      setRB(currentRB);
      setBench(bench.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (
      type === 'TE' &&
      !TE.includes(playerId) &&
      position === 'TE' &&
      TE.length < starterLimits.TE
    ) {
      changeMade = true;
      currentTE.push(playerId);
      setTE(currentTE);
      setBench(bench.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    } else if (
      type === 'FLEX' &&
      !FLEX.includes(playerId) &&
      flexPositions.includes(position) &&
      FLEX.length < starterLimits.FLEX
    ) {
      changeMade = true;
      currentFLEX.push(playerId);
      setFLEX(currentFLEX);
      setQB(currentQB.filter((e) => e !== playerId));
      setWR(currentWR.filter((e) => e !== playerId));
      setRB(currentRB.filter((e) => e !== playerId));
      setTE(currentTE.filter((e) => e !== playerId));
      setBench(bench.filter((e) => e !== playerId));
    } else if (type === 'Bench' && !bench.includes(playerId)) {
      changeMade = true;
      currentBench.push(playerId);
      setBench(currentBench);
      setQB(currentQB.filter((e) => e !== playerId));
      setWR(currentWR.filter((e) => e !== playerId));
      setRB(currentRB.filter((e) => e !== playerId));
      setTE(currentTE.filter((e) => e !== playerId));
      setFLEX(currentFLEX.filter((e) => e !== playerId));
    }

    // if change made is true then user actually made a change so setLineUp
    // else check if they didnt move the card far and if not fire the player pop up
    if (changeMade) setLineupChange(!lineupChange);
    else {
      if (event.delta.x > -5 && event.delta.x < 5 && event.delta.y > -5 && event.delta.y < 5)
        onPlayerClick(player);
    }
  };
  // drop player over container logic
  function handleDragEnd(event) {
    const { over, active } = event;
    if (!over) {
      return;
    }
    const player = players.find(({ id }) => id === active.id).player;
    addPlayer(player, active.id, over.id, player.position, event);
  }

  // generate the weeks for the segmneted control
  const weeks = new Array(Number(currentWeek) - 1);
  for (let i = 1; i <= Number(currentWeek); i++) {
    weeks[i - 1] = { label: i.toString(), value: i.toString() };
  }

  return (
    <>
      <PlayerPopup
        player={selectedPlayer}
        opened={playerPopupOpen}
        onClose={onPlayerPopupClose}
        onPlayerAction={takePlayerAction}
      />
      <AddDropPlayerPopup
        roster={getMyRoster()}
        player={selectedPlayer}
        opened={addDropPopupOpen}
        onClose={onAddDropPopupClose}
        userId={user.id}
      />
      <TradePlayerPopup
        otherRoster={tradeRoster}
        myRoster={getMyRoster()}
        player={selectedPlayer}
        opened={tradePopupOpen}
        onClose={onTradePopupClose}
        userId={user.id}
        week={currentWeek}
      />
      <AddDropPlayerConfirmPopup
        roster={getMyRoster()}
        isAdd={addingPlayer}
        player={selectedPlayer}
        opened={addDropConfirmPopupOpen}
        onClose={onAddDropConfirmClose}
        userId={user.id}
      />
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
                    disabled={disabled || week !== currentWeek}
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
                    disabled={disabled || week !== currentWeek}
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
                    disabled={disabled || week !== currentWeek}
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
                    disabled={disabled || week !== currentWeek}
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
                    disabled={disabled || week !== currentWeek}
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
                    disabled={disabled || week !== currentWeek}
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
