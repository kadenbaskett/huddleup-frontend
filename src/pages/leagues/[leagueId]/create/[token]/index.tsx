import DeleteATeamPopUp from '@components/DeleteATeamPopUp/DeleteATeamPopUp';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Button, Group } from '@mantine/core';
import { removeUserFromTeam } from '@services/apiClient';
import { StoreState } from '@store/store';
import Link from 'next/link';
import React, { useState } from 'react';
import router from 'next/router';
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

export default function index() {
  const store = useSelector((state: StoreState) => state);
  // const leagueInfoFetchStatus: String = store.league.status;
  // const userStatus: String = store.user.status;
  const league = store.league.league;
  const userTeam = store.league.userTeam;
  const currUser = store.user;

  const captainID = userTeam?.managers.find((manager) => manager.is_captain).user_id;
  const isUserManager = currUser.userInfo?.id === captainID;
  const teamManagers = userTeam?.managers;

  const [DeleteTeamPopUp, setDeleteTeamPopUp] = useState(false);

  const onDeleteTeamClick = (event) => {
    event.preventDefault();
    setDeleteTeamPopUp(true);
  };

  const onDeleteTeamClose = () => {
    setDeleteTeamPopUp(false);
  };

  const showDeleteButton = () => {
    return (
      <>
        <Group position='right'>
          <Button
            className='hover:bg-transparent hover:text-red text-xl font-bold hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
            variant='default'
            size='md'
            onClick={(evt) => onDeleteTeamClick(evt)}
          >
            Delete Team
          </Button>

          <DeleteATeamPopUp opened={DeleteTeamPopUp} closed={onDeleteTeamClose} team={userTeam} />
        </Group>
      </>
    );
  };

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(async () => {
    const user = userTeam.managers.find((tempUser) => currUser.userInfo.id === tempUser.user_id);
    const userToRemove = {
      user,
      userTeam,
    };
    await removeUserFromTeam(userToRemove);
    await router.push({
      pathname: '/leagues',
    });
  });

  const showLeaveButton = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <Group position='right'>
            <Button
              className='hover:bg-transparent hover:text-red text-xl font-bold hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='sm'
              formMethod='POST'
              type='submit'
            >
              Leave Team
            </Button>
          </Group>
        </form>
      </>
    );
  };

  return (
    <>
      {!userTeam && (
        <>
          <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold'>
            Creating team...
          </h1>
          <HuddleUpLoader />
        </>
      )}
      {userTeam && (
        <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
          <div className='pt-5'>
            <Link href={`/leagues/${Number(league.id)}/join/${String(league.token)}`}>
              <Button
                className='hover:bg-transparent hover:text-darkBlue text-xl font-bold hover:border hover:border-darkBlue bg-darkBlue text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                radius='lg'
                size='md'
              >
                Back To League
              </Button>
            </Link>
          </div>
          <div className='pt-4 pb-4'>
            <label className='font-varsity text-6xl'>{league.name}</label>
            <div>
              <label className='font-varsity text-orange text-3xl'>{userTeam.name}</label>
            </div>
          </div>

          <div className='pt-4 pb-4'>
            <label className='font-OpenSans font-bold text-2xl'>Team Members:</label>
            <>
              {teamManagers.map((manager) => {
                return createTeamMemberCard(manager, isUserManager, userTeam);
              })}
            </>
          </div>

          <div>{isUserManager ? showDeleteButton() : showLeaveButton()}</div>

          <div className='pt-4'>
            <InviteCard userTeam={userTeam} league={league} />
          </div>
        </div>
      )}
    </>
  );
}
