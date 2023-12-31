/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { draftActions, handleFetchDraftPort } from '@store/slices/draftSlice';
import { StoreState, AppDispatch } from '@store/store';
import DraftPlayerTable from '@components/DraftPlayerTable/DraftPlayerTable';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Button, Grid } from '@mantine/core';
import DraftBelt from '@components/DraftBelt/DraftBelt';
import DraftRosterAndQueueCard from '@components/DraftRosterAndQueueCard/DraftRosterAndQueueCard';
import DraftHistory from '@components/DraftHistory/DraftHistory';
import { useWindowResize } from '@services/helpers';
import { formatMessage, MSG_TYPES } from '@store/middleware/socket';
// import { finishDraft } from '@services/apiClient';

let intervalID = null;

export default function index() {
  const store = useSelector((state: StoreState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus: String = store.league.status;
  const websocketConnected = store.draft.isConnected;
  const websocketTryingToConnect = store.draft.isEstablishingConnection;
  const league = store.league.league;
  const user = store.user;
  const userTeam = store.league.userTeam;

  const isCommissioner = league?.commissioner_id === user?.userInfo.id;

  const draftOrder = store.draft.draftOrder;
  const draftState = store.draft;
  const currentPickTeamId = store.draft.currentPickTeamId;
  const draftStarted =
    draftState.draftStartTimeMS !== 0 && draftState.draftStartTimeMS < new Date().getTime();

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
    const content = {
      player_id: player.id,
    };

    sendMessage(content, MSG_TYPES.DRAFT_PLAYER);
  };

  const queueCallback = (player) => {
    const content = {
      player_id: player.id,
      order: 0,
    };

    sendMessage(content, MSG_TYPES.QUEUE_PLAYER);
  };

  const [time, setTime] = useState(draftState.secondsPerPick);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (league !== null) {
      if (draftStarted && draftState.currentPickNum > 0) {
        const draftOrderFiltered = draftState.draftOrder
          .filter((d) => d.pick > draftState.currentPickNum)
          .map((d) => {
            return d.teamId;
          });
        const teamsFiltered = league.teams
          .filter((t) => draftOrderFiltered.includes(t.id))
          .sort(compareTeam);
        setTeams(teamsFiltered.concat([...league.teams].sort(compareTeam)));
      } else {
        const teamsFiltered = [...league.teams].sort(compareTeam);
        setTeams(teamsFiltered.concat([...league.teams].sort(compareTeam)));
      }
    }
  }, [draftState.draftOrder, league]);

  useEffect(() => {
    clearInterval(intervalID);

    intervalID = setInterval(() => {
      const currentTime = new Date().getTime();
      if (draftState.draftStartTimeMS > currentTime) {
        const thisDiff = draftState.draftStartTimeMS - currentTime;
        const diffSecs = Math.round(thisDiff / 1000);
        setTime(diffSecs);
      } else {
        const currentTeamAuto = draftState.autoDraft.find(
          (a) => a.teamId === draftState.currentPickTeamId,
        )?.auto;

        const seconds = currentTeamAuto ? draftState.autoSecondsPerPick : draftState.secondsPerPick;

        const thisDiff = currentTime - draftState.currentPickTimeMS;
        const diffSecs = Math.round(thisDiff / 1000);
        let tempTime = seconds - diffSecs;
        tempTime = Math.min(seconds, tempTime);
        setTime(tempTime);
      }
    }, 50);
  }, [draftState.currentPickTimeMS, draftState.draftStartTimeMS, draftStarted]);

  const [hasPort, setHasPort] = useState(false);

  useEffect(() => {
    // We don't have a draft port yet and we didn't leave the draft on purpose
    if (!draftState.draftPort) {
      dispatch(handleFetchDraftPort(league.id));
    }
    // We have a draft port in the store, but havn't set the variable to let the other use effect know
    else if (draftState.draftPort && !hasPort) {
      setHasPort(true);
    }
  }, [draftState.draftPort]);

  // This should run once - once we have a draft port
  useEffect(() => {
    if (!websocketConnected && !websocketTryingToConnect && draftState.draftPort) {
      dispatch(draftActions.startConnecting());
    }
  }, [hasPort]);

  // This will run once, and the dismount will only run when we leave the page
  useEffect(() => {
    return () => {
      dispatch(draftActions.closeSocketIntentionally());
    };
  }, []);

  const clickFinishDraft = async () => {
    sendMessage(' ', MSG_TYPES.FILL_DRAFT);
    // await finishDraft(league.id);
  };

  const content = (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && (
        <>
          <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold  min-h-screen'>
            Loading draft content...
            <HuddleUpLoader />
          </h1>
        </>
      )}
      {teams.length > 0 && leagueInfoFetchStatus === 'succeeded' && (
        <>
          <div className='bg-lightGrey min-h-screen overflow-hidden'>
            <div className='text-4xl font-varsity font-darkBlue pr-3 text-center'>
              {league.name} Draft - Round {draftState.currentRoundNum} - Pick{' '}
              {draftState.currentPickNum}{' '}
              {isCommissioner ? (
                <Button
                  className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                  variant='default'
                  radius='lg'
                  size='lg'
                  onClick={async () => await clickFinishDraft()}
                >
                  Finish Draft
                </Button>
              ) : (
                ''
              )}
            </div>
            <div className='p-3 sm:pb-9 md:pb-3'>
              <DraftBelt
                activeTeam={teams.find((t) => t.id === draftState.currentPickTeamId)}
                teams={teams !== undefined ? teams : league.teams}
                time={time}
                draftStarted={draftStarted}
              />
            </div>
            <Grid className='relative z-30'>
              <Grid.Col span={draftRosterAndQueueCardSpan} className='pl-4'>
                <DraftRosterAndQueueCard currUser={user.userInfo} />
              </Grid.Col>
              <Grid.Col span={draftPlayerTableSpan}>
                <DraftPlayerTable
                  draftCallback={(player: any) => draftCallback(player)}
                  queueCallback={(player: any) => queueCallback(player)}
                  league={league}
                  currentlyPicking={userTeam.id === currentPickTeamId && draftStarted}
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
      <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold  min-h-screen'>
        Connecting to draft...
        <HuddleUpLoader />
      </h1>
    </>
  );

  return websocketConnected ? content : draftLoadingContent;
}
