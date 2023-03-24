import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { draftActions } from '@store/slices/draftSlice';
import { StoreState } from '@store/store';
import DraftPlayerTable from '@components/DraftPlayerTable/DraftPlayerTable';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';

export default function index() {
  const dispatch = useDispatch();

  const websocketConnected = useSelector((state: StoreState) => state.draft.isConnected);
  const websocketTryingToConnect = useSelector((state: StoreState) => state.draft.isConnected);
  const league = useSelector((state: StoreState) => state.league);
  const draftTime = useSelector(
    (state: StoreState) => state.league.league?.settings.draft_settings.date,
  );
  const draftCompleted = useSelector((state: StoreState) => false); // TODO put draft complete into database
  const draftInProgress = new Date(draftTime).getTime() < new Date().getTime() && !draftCompleted;
  console.log(draftInProgress);
  console.log(league);

  // const sendMessage = (msg: Object) => {
  //   const content: string = JSON.stringify(msg);
  //   dispatch(draftActions.sendMessage({content}));
  // };

  useEffect(() => {
    if (!websocketConnected && !websocketTryingToConnect) {
      console.log('Use effect: trying to establish connection');
      dispatch(draftActions.startConnecting());
    }
  }, [websocketTryingToConnect]);

  const content = (
    <>
      <DraftPlayerTable></DraftPlayerTable>
    </>
  );
  const nothing = (
    <>
      <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold'>
        Connecting to draft...
      </h1>
      <HuddleUpLoader />
    </>
  );

  return websocketConnected ? content : nothing;
}
