import { useRouter } from 'next/router';
import React from 'react';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import { StoreState } from '@store/store';
import { useSelector } from 'react-redux';

function league() {
  const router = useRouter();
  const { leagueId } = router.query;

  const league = useSelector((state: StoreState) => state.league.league);
  const team = useSelector((state: StoreState) => state.league.userTeam);

  return (
    <>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='standings'
      />
      <div>This will display the information of standings - {leagueId}</div>
    </>
  );
}

export default league;
