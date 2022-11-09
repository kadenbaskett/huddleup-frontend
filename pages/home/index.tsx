import React from 'react'
// import { render } from 'react-dom';
// import MyFriends from '../../components/MyFriends/MyFriends';
import MyNews from '../../components/MyNews/MyNews'
import MyTeams from '../../components/MyTeams/MyTeams'

// const names = [];

const Home = (props: any) => {
  return (
    <div className='grid grid-cols-10 gap-6 bg-slate-300 p-10'>
      <div className='col-span-4 '>
        <div>
          <MyTeams />
        </div>
        <div className='pt-5'></div>
      </div>
      <div className='col-span-6'>
        <MyNews />
      </div>
    </div>
  )
}

export default Home
