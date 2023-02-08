import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Team } from '@interfaces/league.interface';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import TeamMemberCard from './components/TeamMemberCard';

const renderTeamMemberCard = () => {
  <TeamMemberCard />;
};

const getUserTeamName = (userTeams: Team[], leagueId) => {
  return userTeams.find((team) => team.league.id === leagueId).name;
};

export default function index() {
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const userStatus: String = useSelector((state: StoreState) => state.user.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const userTeams = useSelector((state: StoreState) => state.user.teams);
  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && userStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && userStatus === 'succeeded' && (
        <div className='bg-lightGrey p-10 min-h-screen gap-10'>
          <div className='pt-4 pb-4'>
            <label className='font-varsity text-6xl'>{league.name}</label>
            <div>
              <label className='font-varsity text-orange text-3xl'>
                {getUserTeamName(userTeams, league.id)}
              </label>
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
