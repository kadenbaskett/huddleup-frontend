/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { draftActions, handleFetchDraftPort } from '@store/slices/draftSlice';
import { StoreState, AppDispatch } from '@store/store';
import DraftPlayerTable from '@components/DraftPlayerTable/DraftPlayerTable';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid } from '@mantine/core';
import DraftBelt from '@components/DraftBelt/DraftBelt';
import DraftRosterAndQueueCard from '@components/DraftRosterAndQueueCard/DraftRosterAndQueueCard';
import DraftHistory from '@components/DraftHistory/DraftHistory';
import { useWindowResize } from '@services/helpers';
import { formatMessage, MSG_TYPES } from '@store/middleware/socket';

export default function index() {
  const DRAFT_CONFIG = {
    SECONDS_PER_PICK: 30,
  };
  const store = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus: String = store.league.status;
  const websocketConnected = store.draft.isConnected;
  const websocketTryingToConnect = store.draft.isEstablishingConnection;
  const league = store.league.league;
  const user = store.user;
  const draftTime = league.settings.draft_settings.date;

  const draftCompleted = useSelector((state: StoreState) => false); // TODO put draft complete into database
  const draftInProgress = new Date(draftTime).getTime() > new Date().getTime() && !draftCompleted;
  const draftPlayers = useSelector((state: StoreState) => state.draft.draftPlayers);
  const queuePlayers = useSelector((state: StoreState) => state.draft.draftQueue);
  const draftOrder = useSelector((state: StoreState) => state.draft.draftOrder);
  const draftState = useSelector((state: StoreState) => state.draft);
  console.log('draftState', draftState);

  const windowSize: number[] = useWindowResize();

  let draftRosterAndQueueCardSpan = 0;
  let draftPlayerTableSpan = 0;
  let draftHistorySpan = 0;

  if (windowSize[0] > 1050 || windowSize[0] === 0) {
    draftRosterAndQueueCardSpan = 3;
    draftPlayerTableSpan = 6;
    draftHistorySpan = 3;
  } else if (windowSize[0] > 750) {
    draftRosterAndQueueCardSpan = 6;
    draftPlayerTableSpan = 6;
    draftHistorySpan = 12;
  } else {
    draftRosterAndQueueCardSpan = 12;
    draftPlayerTableSpan = 12;
    draftHistorySpan = 12;
  }

  const sendMessage = (msgContent: Object, type: string) => {
    const formatted = formatMessage(msgContent, type);
    dispatch(draftActions.sendMessage(formatted));
  };

  function compareTeam(a, b) {
    const draftOrderA = draftState?.draftOrder.find((d) => d.teamId === a.id);
    const draftOrderB = draftState?.draftOrder.find((d) => d.teamId === b.id);
    if (draftOrderA?.pick < draftOrderB?.pick) return -1;
    else if (draftOrderA?.pick > draftOrderB?.pick) return 1;
    return 0;
  }

  const draftCallback = (player) => {
    // const draftPlayer: DraftPlayer = {
    //   player_id: player.id,
    //   team_id: user.teams.find((team) => team.league.id === league.id).id,
    //   league_id: league.id,
    // };

    const content = {
      player_id: player.id,
    };

    sendMessage(content, MSG_TYPES.DRAFT_PLAYER);
  };

  const queueCallback = (player) => {
    // const queuePlayer: QueuePlayer = {
    //   player_id: player.id,
    //   team_id: user.teams.find((team) => team.league.id === league.id).id,
    //   league_id: league.id,
    //   order: 1,
    // };
    // console.log('queuePlayer', queuePlayer);
    const content = {
      player_id: player.id,
      order: 0,
    };

    sendMessage(content, MSG_TYPES.QUEUE_PLAYER);
  };

  const [time, setTime] = useState(DRAFT_CONFIG.SECONDS_PER_PICK);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (league !== null) {
      setTeams([...league.teams].sort(compareTeam));
    }
  }, [leagueInfoFetchStatus, draftOrder]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
      if (time < 1) {
        setTime(DRAFT_CONFIG.SECONDS_PER_PICK);
        const tempTeam = teams[0];
        const tempTeams = [...teams];
        tempTeams.shift();
        tempTeams.push(tempTeam);
        setTeams(tempTeams);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (!websocketConnected && !websocketTryingToConnect) {
      // dispatch(handleFetchDraftPort(Number(leagueId)));
      dispatch(draftActions.startConnecting());
    }

    return () => {
      dispatch(draftActions.killConnection());
    };
  }, []);

  const content = (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && (
        <>
          <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold'>
            Loading draft content...
          </h1>
          <HuddleUpLoader />
        </>
      )}
      {teams.length > 0 && leagueInfoFetchStatus === 'succeeded' && (
        <>
          <div className='bg-lightGrey min-h-screen'>
            <div className='text-4xl font-varsity font-darkBlue pl-3 text-center'>
              {league.name} Draft - Round {draftState.currentRoundNum} - Pick{' '}
              {draftState.currentPickNum}
            </div>
            <div className='p-3 sm:pb-9 md:pb-3'>
              <DraftBelt teams={teams !== undefined ? teams : league.teams} time={time} />
            </div>
            <Grid className='relative z-30'>
              <Grid.Col span={draftRosterAndQueueCardSpan} className='pl-4'>
                <DraftRosterAndQueueCard currUser={user.userInfo} teams={league.teams} />
              </Grid.Col>
              <Grid.Col span={draftPlayerTableSpan}>
                <DraftPlayerTable
                  draftCallback={(player: any) => draftCallback(player)}
                  queueCallback={(player: any) => queueCallback(player)}
                  league={league}
                />
              </Grid.Col>
              <Grid.Col span={draftHistorySpan} className='pr-4'>
                <DraftHistory />
              </Grid.Col>
            </Grid>
          </div>
        </>
      )}
    </>
  );

  const draftLoadingContent = (
    <>
      <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold'>
        Connecting to draft...
      </h1>
      <HuddleUpLoader />
    </>
  );

  return websocketConnected ? content : draftLoadingContent;
}
