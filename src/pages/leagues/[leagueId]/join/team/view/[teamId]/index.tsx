import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import TeamMemberCard from './components/TeamMemberCard/TeamMemberCard';

const renderTeamMemberCard = () => {
  <TeamMemberCard />;
};

export default function index() {
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  // const user: userSliceState = useSelector((state: StoreState) => state.user);

  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='bg-lightGrey p-10 min-h-screen gap-10'>
          <div className='pt-4 pb-4'>
            <label className='font-varsity text-6xl'>{league.name}</label>
            <div>
              <label className='font-varsity text-orange text-3xl'>Team Name</label>
            </div>
          </div>

          <div className='pt-4 pb-4'>
            <label className='font-OpenSans font-bold text-2xl'>Team Members:</label>
            <>{renderTeamMemberCard()}</>
          </div>
        </div>
      )}
    </>
  );
}
