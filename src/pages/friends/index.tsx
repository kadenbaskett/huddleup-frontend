import { FriendCard, friendProps } from '@components/FriendCard/FriendCard';
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Button, Group } from '@mantine/core';
import { StoreState } from '@store/store';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';

/*
*  This will have to be done later. Here we will get the friends of the specific user
const friendData = publicLeagues.map((league) => {
  const l: friendProps = {
    name: league.name,
    id: league.id,
    subText: 'This is an example league description',
  };
  return l;
});
*/
const friendData: friendProps[] = [
  {
    name: 'Joe',
    id: 1,
  },
  {
    name: 'Jake',
    id: 2,
  },
  {
    name: 'Kaden',
    id: 3,
  },
];

const renderFriends = () => {
  return friendData.map((friend: friendProps) => renderFriend(friend));
};

const renderFriend = (friend: friendProps) => {
  return (
    <div key={friend.id} className='grid col-span-10 p-1'>
      <FriendCard {...friend} />
    </div>
  );
};

function friends() {
  const userInfoFetchStatus: String = useSelector((state: StoreState) => state.user.status);

  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <div className='pt-10 pb-20 pl-20 pr-20 bg-lightGrey min-h-screen'>
          <div>
            <label className='font-varsity text-6xl'>Friends</label>
          </div>

          <div className='pt-10'>
            <Group>
              <Button
                leftIcon={<AiOutlinePlus />}
                className='hover:bg-transparent hover:text-green text-xl font-bold hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='xl'
              >
                Add A Friend
              </Button>
            </Group>
          </div>

          <div className='pt-10'>{renderFriends()}</div>
        </div>
      )}
    </>
  );
}

export default friends;
