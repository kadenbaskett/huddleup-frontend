import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Table } from '@mantine/core';
import { StoreState } from '@store/store';
import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const players = useSelector((state: StoreState) => state.league.player_list);

  console.log(players);

  const rows = players.map((p) => (
    <tr key={p.id}>
      <td>
        {p.first_name} {p.last_name}
      </td>
      <td>{p.id}</td>
      <td>{p.external_id}</td>
      <td>{p.position}</td>
      <td>
        {p.nfl_team ? p.nfl_team.city : ''} {p.nfl_team ? p.nfl_team.name : ''}
      </td>
      <td>{p.status}</td>
      <td>
        <img src={p.photo_url}></img>
      </td>
    </tr>
  ));

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);

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

export default league;
