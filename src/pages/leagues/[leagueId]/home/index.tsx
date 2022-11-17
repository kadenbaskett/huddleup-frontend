import {useRouter} from 'next/router';
import React from 'react';

function league() {
  const router = useRouter();
  const {leagueId} = router.query;
  return <div>This will display the information of league - {leagueId}</div>;
}

export default league;
