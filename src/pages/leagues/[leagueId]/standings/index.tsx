import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { AppDispatch, StoreState } from '@store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Space, Table } from '@mantine/core';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const dispatch = useDispatch<AppDispatch>();
  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.leagueFetchStatus);
  const league = useSelector((state: StoreState) => state.league.league);

  useEffect(() => {
    if (leagueInfoFetchStatus === 'idle' && leagueId) {
      dispatch(fetchLeagueInfoThunk(Number(leagueId)));
    }
  }, [leagueInfoFetchStatus, dispatch, leagueId]);

  const teams = [
    {
      id: 1,
      name: 'Krispy Kareem',
      managers: ['Joe Rod', 'Kaden Bask'],
      wins: 11,
      losses: 1,
      ties: 0,
    },
    {
      id: 2,
      name: 'Dead Oatmeal',
      managers: ['Just Perz', 'Jakk Wyte'],
      wins: 1,
      losses: 11,
      ties: 0,
    },
  ];

  const rows = teams.map((element) => (
    <tr key={element.id}>
      <td>{element.name}</td>
      <td>
        {
          <ul>
            {element.managers.map((manager) => (
              <li key={manager}>{manager}</li>
            ))}
          </ul>
        }
      </td>
      <td>{element.wins}</td>
      <td>{element.losses}</td>
      <td>{element.ties}</td>
    </tr>
  ));

  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='standings'
      />
      <Space h='md' />
      <Grid>
        <Grid.Col span={10} offset={1}>
          <Table striped highlightOnHover withBorder withColumnBorders>
            <thead className={'bg-darkBlue font-varsity'}>
              <tr>
                <th>
                  <p className='text-white'>Team</p>
                </th>
                <th>
                  <p className='text-white'>Managers</p>
                </th>
                <th>
                  <p className='text-white'>Wins</p>
                </th>
                <th>
                  <p className='text-white'>Losses</p>
                </th>
                <th>
                  <p className='text-white'>Ties</p>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default league;
