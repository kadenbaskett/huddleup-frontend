import {useRouter} from 'next/router';
import React from 'react';
import LeagueNavBar from '../../../../components/LeagueNavBar/LeagueNavBar';

function league() {
  const router = useRouter();
  const {leagueId} = router.query;
  return (
    <>
      <LeagueNavBar
        teamName='team name'
        teamId={2}
        leagueName='league name'
        leagueId={Number(leagueId)}
        page='team'
      />
      <div>This will display the team information of league - {leagueId}</div>
    </>
  );
}

export default league;
