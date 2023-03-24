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

export default function index() {
  const dispatch = useDispatch();
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const websocketConnected = useSelector((state: StoreState) => state.draft.isConnected);
  const websocketTryingToConnect = useSelector((state: StoreState) => state.draft.isConnected);
  const league = useSelector((state: StoreState) => state.league.league);
  const user = useSelector((state: StoreState) => state.user.userInfo);
  const draftTime = useSelector(
    (state: StoreState) => state.league.league?.settings.draft_settings.date,
  );
  const draftCompleted = useSelector((state: StoreState) => false); // TODO put draft complete into database
  const draftInProgress = new Date(draftTime).getTime() < new Date().getTime() && !draftCompleted;

  const sendMessage = (msg: Object) => {
    const content: string = JSON.stringify(msg);
    dispatch(draftActions.sendMessage({ content }));
  };

  const playersChosen: any[] = [];

  function removePlayerFromList(player) {
    playersChosen.push(player);
  }

  const print = false;

  if (print) {
    sendMessage({});
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
      console.log('Use effect: trying to establish connection');
      dispatch(draftActions.startConnecting());
    }
  }, [websocketTryingToConnect]);

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
            <div className='p-3'>
              <DraftBelt teams={teams !== undefined ? teams : league.teams} time={time} />
            </div>
            <Grid>
              <Grid.Col span={3} className='pl-4'>
                <DraftRosterAndQueueCard currUser={user} teams={league.teams} />
              </Grid.Col>
              <Grid.Col span={6}>
                <DraftPlayerTable
                  playersChosen={playersChosen}
                  removePlayerFromList={removePlayerFromList}
                />
              </Grid.Col>
              <Grid.Col span={3} className='pr-4'>
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
