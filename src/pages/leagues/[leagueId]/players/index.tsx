import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Table } from '@mantine/core';
import { AppDispatch, StoreState } from '@store/store';
import { fetchLeagueInfoThunk, fetchLeaguePlayersThunk } from '@store/slices/leagueSlice';

function league(props) {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const leaguePlayerFetchStatus = useSelector(
    (state: StoreState) => state.league.playerFetchStatus,
  );
  const players = useSelector((state: StoreState) => state.league.playerList);
  const league = useSelector((state: StoreState) => state.league.league);

  if (players) {
    console.log(players[0]);
  }

  useEffect(() => {
    if ((leagueInfoFetchStatus === 'idle' || leaguePlayerFetchStatus === 'idle') && leagueId) {
      dispatch(fetchLeaguePlayersThunk(Number(leagueId)));
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, leaguePlayerFetchStatus, dispatch, leagueId]);

  const rows = players.map((p) => (
    <tr key={p.id}>
      <td>
        <img src={p.photo_url}></img>
      </td>
      <td>
        {p.first_name} {p.last_name}
      </td>
      <td>{p.position}</td>
      <td>
        {p.current_nfl_team ? p.current_nfl_team.city : ''}{' '}
        {p.current_nfl_team ? p.current_nfl_team.name : ''}
      </td>
      <td>{p.status}</td>
    </tr>
  ));

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='players'
      />
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Position</th>
            <th>Team</th>
            <th>Status</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default league;
