import React from 'react';
import MyFriends from './components/MyFriends/MyFriends';
import MyNews from './components/MyNews/MyNews';
import MyTeams from './components/MyTeams/MyTeams';
import { Friend } from './types';

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

const friendData: Friend[] = [
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

// const renderFriends = () => {
//   return friendData.map((friend: myFriendProps) => renderFriend(friend));
// };

// const renderFriend = (friend: myFriendProps) => {
//   return (
//     <div key={friend.id} className='grid col-span-10 p-1'>
//       <MyFriends {...friend} />
//     </div>
//   );
// };

export default function Home(props: any) {
  return (
    <div className='grid grid-cols-10 gap-6 bg-lightGrey p-10 min-h-screen'>
      <div className='col-span-3'>
        <div className='bg-white rounded-xl hover:drop-shadow-md'>
          <MyTeams />
        </div>
        <div className='pt-5'>
          <div className='grid grid-cols-1 bg-white hover:drop-shadow-md rounded-xl'>
            <MyFriends friends={friendData} />
          </div>
        </div>
      </div>
      <div className='col-span-7'>
        <MyNews />
      </div>
    </div>
  );
}
