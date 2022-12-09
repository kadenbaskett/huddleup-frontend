import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';

import { StoreState, wrapper } from '@store/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlayersThunk } from '@store/slices/playersSlice';

import { Table } from '@mantine/core';

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const players = useSelector((state: StoreState) => state.players.player_list);
  const playerFetchStatus = useSelector((state: StoreState) => state.players.status);
  console.log('players: ', players);

  const rows = players.map((p) => (
    <tr key={p.id}>
      <td>
        {p.first_name} {p.last_name}
      </td>
      <td>{p.id}</td>
      <td>{p.external_id}</td>
      <td>{p.position}</td>
      <td>
        {p.nfl_team.city} {p.nfl_team.name}
      </td>
      <td>{p.status}</td>
      <td>
        <img src={p.photo_url}></img>
      </td>
    </tr>
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
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>id (for dev)</th>
            <th>external_id (for dev)</th>
            <th>Position</th>
            <th>Team</th>
            <th>Status</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
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
