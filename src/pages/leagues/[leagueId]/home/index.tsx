import {useRouter} from 'next/router';
import React from 'react';
import LeagueNavBar from '../../../../components/LeagueNavBar/LeagueNavBar';

function league() {
  const router = useRouter();
  const {leagueId} = router.query;
  return (
    <>
      <LeagueNavBar />
      <div>This will display the information of league - {leagueId}</div>
    </>
  );
}

export default league;
