import React from 'react';
import { render } from 'react-dom';
import MyTeams from '../../components/MyTeams/MyTeams';
import MyFriends from '../../components/MyFriends/MyFriends';
import MyNews from '../../components/MyNews/MyNews';
const Home = (props: any) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <MyTeams />
        </div>
        <div>
          <MyNews />
        </div>
        <div>
          <MyFriends />
        </div>
      </div>
    </div>
  );
};

export default Home;
