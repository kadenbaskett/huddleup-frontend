import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { draftActions } from '@store/slices/draftSlice';
import { StoreState } from '@store/store';
import DraftPlayerTable from '@components/DraftPlayerTable/DraftPlayerTable';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid, NativeSelect, SegmentedControl, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function index() {
  const dispatch = useDispatch();
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const websocketConnected = useSelector((state: StoreState) => state.draft.isConnected);
  const websocketTryingToConnect = useSelector(
    (state: StoreState) => state.draft.isEstablishingConnection,
  );
  const league = useSelector((state: StoreState) => state.league);
  const draftTime = useSelector(
    (state: StoreState) => state.league.league?.settings.draft_settings.date,
  );
  const draftCompleted = useSelector((state: StoreState) => false); // TODO put draft complete into database
  const draftInProgress = new Date(draftTime).getTime() < new Date().getTime() && !draftCompleted;

  const sendMessage = (msg: Object) => {
    const content: string = JSON.stringify(msg);
    dispatch(draftActions.sendMessage({ content }));
  };

  const print = false;

  if (print) {
    sendMessage({});
    console.log(draftInProgress);
    console.log(league);
  }

  useEffect(() => {
    if (!websocketConnected && !websocketTryingToConnect) {
      dispatch(draftActions.startConnecting());
    }

    return () => {
      console.log('Connection should be killed now!');
      dispatch(draftActions.killConnection());
    };
  }, []);

  // Player filtering
  const form = useForm({
    initialValues: {
      player: '',
      position: 'All',
      availability: 'Available',
    },
  });

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
      {leagueInfoFetchStatus === 'succeeded' && (
        <>
          <div className='bg-lightGrey min-h-screen'>
            <Grid>
              <Grid.Col span={10} offset={1}>
                <Grid.Col>
                  <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <div className='bg-white rounded-xl hover:drop-shadow-md'>
                      <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
                        Filters
                      </div>
                      <div className='pr-4 pl-4 pt-2'>
                        <div className='text-md font-varsity text-darkBlue'>Position:</div>
                        <SegmentedControl
                          color='orange'
                          fullWidth
                          transitionDuration={400}
                          transitionTimingFunction='linear'
                          data={[
                            { label: 'All', value: 'All' },
                            { label: 'QB', value: 'QB' },
                            { label: 'RB', value: 'RB' },
                            { label: 'WR', value: 'WR' },
                            { label: 'TE', value: 'TE' },
                            { label: 'FLEX', value: 'FLEX' },
                          ]}
                          {...form.getInputProps('position')}
                        />
                      </div>
                      <div className='pr-4 pl-4 pt-2'>
                        <div className='text-md font-varsity text-darkBlue'>Player Name:</div>
                        <TextInput
                          placeholder='Justin Jefferson'
                          {...form.getInputProps('player')}
                        />
                      </div>
                      <div className='pr-4 pl-4 pt-2 pb-4'>
                        <div className='text-md font-varsity text-darkBlue'>Availability:</div>
                        <NativeSelect
                          data={['All', 'Available', 'Waivers', 'Free Agents', 'On Rosters']}
                          {...form.getInputProps('availability')}
                        />
                      </div>
                    </div>
                  </form>
                </Grid.Col>
              </Grid.Col>
            </Grid>
            <DraftPlayerTable></DraftPlayerTable>
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
