import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { Table } from '@mantine/core';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function index() {
  const router = useRouter();
  const { leagueId } = router.query;

  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);

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
    <div>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='home'
      />
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <>
          <LeagueHomeNavigation
            leagueId={Number(leagueId)}
            leagueName={league ? league.name : ' '}
            leagueDescription={'This is an example league description'}
            page='teams'
          />
          <div>This is the teams page for a league</div>
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
      )}
    </div>
  );
}

export default index;
