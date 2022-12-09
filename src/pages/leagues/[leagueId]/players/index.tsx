import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';

import { StoreState, wrapper } from '@store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayersThunk } from '@store/slices/playersSlice';

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const players = useSelector((state: StoreState) => state.players.player_list);
  const playerFetchStatus = useSelector((state: StoreState) => state.players.status);
  console.log('players: ', players);

  const listItems = players.map((p) => (
    <li key={p.id}>
      {p.first_name} {p.last_name}
    </li>
  ));

  useEffect(() => {
    console.log('Use effect');
    if (playerFetchStatus === 'idle') {
      dispatch(fetchPlayersThunk());
    }
  }, [playerFetchStatus, dispatch]);

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName='league name'
        leagueId={Number(leagueId)}
        page='players'
      />
      <div>This will display the players information of league - {leagueId}</div>

      <ul>{listItems}</ul>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  // const response = await fetch(`https://reqres.in/api/users/${Math.floor(Math.random() * 10 + 1)}`);
  // const {data} = await response.json();
  // store.dispatch(addUser(`${data.first_name} ${data.last_name}`));
  // return {
  // };
});

export default league;
