import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { draftActions } from '@store/slices/draftSlice';
import { StoreState } from '@store/store';

export default function index() {
  const dispatch = useDispatch();

  const websocketConnected = useSelector((state: StoreState) => state.draft.isConnected);
  const websocketTryingToConnect = useSelector((state: StoreState) => state.draft.isConnected);

  // const sendMessage = (msg: Object) => {
  //   const content: string = JSON.stringify(msg);
  //   dispatch(draftActions.sendMessage({content}));
  // };

  useEffect(() => {
    if (!websocketConnected && !websocketTryingToConnect) {
      console.log('Use effect: trying to establish connection');
      dispatch(draftActions.startConnecting());
    }
  }, []);

  return <div>index</div>;
}
