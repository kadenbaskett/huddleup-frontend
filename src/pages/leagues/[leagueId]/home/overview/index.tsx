import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import RecentActivityCard, {
  recentActivityCardProps,
} from '@components/RecentActivityCard/RecentActivityCard';
import { Anchor, Grid } from '@mantine/core';
import { fetchLeagueInfoThunk } from '@store/slices/leagueSlice';
import { AppDispatch, StoreState } from '@store/store';
import { DataTable } from 'mantine-datatable';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const activityData: recentActivityCardProps[] = [
  {
    type: 'drop',
    fromTeamId: 0,
    toTeamId: 2,
  },
  {
    type: 'add',
    fromTeamId: 0,
    toTeamId: 1,
  },
  {
    type: 'trade',
    fromTeamId: 2,
    toTeamId: 1,
  },
  {
    type: 'add/drop',
    fromTeamId: 2,
    toTeamId: 1,
  },
];

// const renderRecentActivityCards = () => {
//   return activityData.map((activty) => renderActivity(activty));
// };

const renderActivity = (activty: recentActivityCardProps) => {
  return (
    <div className=''>
      <RecentActivityCard {...activty} />
    </div>
  );
};

function index() {
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

  return (
    <div className='bg-lightGrey min-h-screen'>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='home'
      />
      <LeagueHomeNavigation
        leagueId={Number(leagueId)}
        leagueName={league ? league.name : ' '}
        leagueDescription={'This is an example league description'}
        page='overview'
      />
      <div className='p-5'>
        <Grid columns={10}>
          <Grid.Col span={7}>
            <div className='p-4 font-varsity justify-left text-3xl bg-darkBlue text-white rounded-t-xl'>
              Recent Activity
            </div>
            <Grid>
              <Grid.Col>
                <DataTable
                  withBorder
                  withColumnBorders
                  records={activityData}
                  columns={[
                    {
                      accessor: 'type',
                      title: 'Details',
                      render: (p) => renderActivity(activityData[0]),
                    },
                    { accessor: 'toTeamId' },
                    { accessor: 'fromTeamId' },
                  ]}
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={3}>
            <Anchor href={'/leagues/' + String(leagueId) + '/standings'} variant='text'>
              <div className='p-4 font-varsity justify-left text-3xl bg-darkBlue text-white rounded-t-xl'>
                Top 5 in {league ? league.name : ' '}
              </div>
            </Anchor>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}

export default index;
