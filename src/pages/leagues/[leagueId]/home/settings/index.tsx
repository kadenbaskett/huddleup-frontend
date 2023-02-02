import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function index() {
  const router = useRouter();
  const { leagueId } = router.query;

  const leagueInfoFetchStatus = useSelector((state: StoreState) => state.league.status);
  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);

  return (
    <div>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
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
            leagueDescription={league ? league.description : ' '}
            page='settings'
          />
          <div>This is the settings page for a league</div>
        </>
      )}
    </div>
  );
}

export default index;
