import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Button, Group } from '@mantine/core';
import { StoreState } from '@store/store';
import React from 'react';
import { useSelector } from 'react-redux';
import InviteCard from '../../../../../components/InviteCard/InviteCard';
import TeamMemberCard from '../../../../../components/TeamMemberCard/TeamMemberCard';

const createTeamMemberCard = (manager, isCaptain: boolean, team) => {
  return (
    <div className='pt-1 pb-1'>
      <TeamMemberCard manager={manager} isCaptain={isCaptain} team={team} />
    </div>
  );
};

const showDeleteButton = () => {
  return (
    <>
      <Group position='right'>
        <Button
          className='hover:bg-transparent hover:text-red text-xl font-bold hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
          variant='default'
          size='md'
        >
          Delete Team
        </Button>
      </Group>
    </>
  );
};

export default function index() {
  const leagueInfoFetchStatus: String = useSelector((state: StoreState) => state.league.status);
  const userStatus: String = useSelector((state: StoreState) => state.user.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const userTeam = useSelector((state: StoreState) => state.league.userTeam);
  const user = useSelector((state: StoreState) => state.user);
  const captainID = userTeam?.managers.find((manager) => manager.is_captain).user_id;
  const isUserManager = user.userInfo?.id === captainID;
  const teamManagers = userTeam?.managers;
  return (
    <>
      {leagueInfoFetchStatus !== 'succeeded' && userStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
          <div className='pt-4 pb-4'>
            <label className='font-varsity text-6xl'>{league.name}</label>
            <div>
              <label className='font-varsity text-orange text-3xl'>
                {userTeam ? userTeam.name : ''}
              </label>
            </div>
          </div>

          <div className='pt-4 pb-4'>
            <label className='font-OpenSans font-bold text-2xl'>Team Members:</label>
            <>
              {teamManagers?.map((manager) => {
                return createTeamMemberCard(manager, isUserManager, userTeam);
              })}
            </>
          </div>

          <div>{isUserManager ? showDeleteButton() : ''}</div>

          <div className='pt-4'>
            <InviteCard userTeam={userTeam} league={league} />
          </div>
        </div>
      )}
    </>
  );
}
