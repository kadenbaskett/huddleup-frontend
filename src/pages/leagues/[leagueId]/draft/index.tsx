import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { draftActions } from '@store/slices/draftSlice';
import { StoreState } from '@store/store';
import DraftPlayerTable from '@components/DraftPlayerTable/DraftPlayerTable';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid } from '@mantine/core';
import DraftBelt from '@components/DraftBelt/DraftBelt';
import DraftRosterAndQueueCard from '@components/DraftRosterAndQueueCard/DraftRosterAndQueueCard';
import DraftHistory from '@components/DraftHistory/DraftHistory';
import { DraftPlayer, QueuePlayer } from '@interfaces/draft.interface';
import { useWindowResize } from '@services/helpers';

export default function index() {
  const dispatch = useDispatch();
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const websocketConnected = useSelector((state: StoreState) => state.draft.isConnected);
  const websocketTryingToConnect = useSelector(
    (state: StoreState) => state.draft.isEstablishingConnection,
  );
  const league = useSelector((state: StoreState) => state.league.league);
  const user = useSelector((state: StoreState) => state.user);
  const draftTime = useSelector(
    (state: StoreState) => state.league.league?.settings.draft_settings.date,
  );
  const draftCompleted = useSelector((state: StoreState) => false); // TODO put draft complete into database
  const draftInProgress = new Date(draftTime).getTime() > new Date().getTime() && !draftCompleted;

  const windowSize: number[] = useWindowResize();

  let draftRosterAndQueueCardSpan = 0;
  let draftPlayerTableSpan = 0;
  let draftHistorySpan = 0;

  if (windowSize[0] > 1050) {
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
    dispatch(draftActions.sendMessage({ content: msgContent, type }));
  };

  const draftCallback = (player) => {
    const draftPlayer: DraftPlayer = {
      player_id: player.id,
      team_id: user.teams.find((team) => team.league.id === league.id).id,
      league_id: league.id,
    };

    console.log('draftPlayer', draftPlayer);
  };

  const queueCallback = (player) => {
    const queuePlayer: QueuePlayer = {
      player_id: player.id,
      team_id: user.teams.find((team) => team.league.id === league.id).id,
      league_id: league.id,
      order: 1,
    };
    console.log('queuePlayer', queuePlayer);
  };

  const print = false;

  if (print) {
    sendMessage({ draftObject: 'testObject' }, 'testType');
    console.log(draftInProgress);
    console.log(league);
  }
  const [time, setTime] = useState(5);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (league !== null) {
      setTeams(league.teams);
    }
  }, [leagueInfoFetchStatus]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      }
      if (time < 1) {
        setTime(5);
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
      dispatch(draftActions.startConnecting());
    }

    return () => {
      console.log('Connection should be killed now!');
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
              {league.name} Draft - Round 3
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
                  playersChosen={[]}
                  draftCallback={(player) => draftCallback(player)}
                  queueCallback={(player) => queueCallback(player)}
                  league={league}
                />
              </Grid.Col>
              <Grid.Col span={draftHistorySpan} className='pr-4'>
                <DraftHistory players={[]} />
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
