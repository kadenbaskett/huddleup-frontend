import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Table } from '@mantine/core';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const league = useSelector((state: StoreState) => state.league.league);

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);

  const teams = league ? league.teams : [];

  const rows = teams.map((t) => (
    <tr key={t.id}>
      <td>{t.id}</td>
      <td>{t.name}</td>
      <td>
        <ul>
          {t.managers.map((manager) => (
            <li key={manager.id}>{manager.user.username}</li>
          ))}
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ''}
        leagueId={Number(leagueId)}
        page='home'
      />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Managers</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default league;
