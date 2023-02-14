/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import LeagueHomeNavigation from '@components/LeagueHomeNavigation/LeagueHomeNavigation';
import LeagueNavBar from '@components/LeagueNavBar/LeagueNavBar';
import LeagueSettingsCard from '@components/LeagueSettingsCard/LeagueSettingsCard';
import { HuddleUpDate } from '@services/helpers';
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

  const basicSettingsContent = league?.settings ? (
    <tbody>
      <tr>
        <td>League Name</td>
        <td>{league.name}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>{league.description}</td>
      </tr>
      <tr>
        <td>League Privacy (for joining)</td>
        <td>{league.settings.public_join ? 'Public' : 'Private'}</td>
      </tr>
      <tr>
        <td>Num Teams</td>
        <td>{league.settings.num_teams}</td>
      </tr>
      <tr>
        <td>Scoring Type</td>
        <td>
          {league.settings.scoring_settings.points_per_reception ? 'PPR' : 'Standard - No PPR'}
        </td>
      </tr>
      <tr>
        <td>Managers Per Team</td>
        <td>{`${league.settings.min_players} - ${league.settings.max_players}`}</td>
      </tr>
    </tbody>
  ) : (
    <></>
  );

  const draftSettingsContent = league?.settings ? (
    <tbody>
      <tr>
        <td>Draft Date</td>
        <td>{HuddleUpDate(new Date(league.settings.draft_settings.date))}</td>
      </tr>
      <tr>
        <td>Seconds Per Pick</td>
        <td>{league.settings.draft_settings.seconds_per_pick}</td>
      </tr>
      <tr>
        <td>Draft Type</td>
        <td>{'Snake'}</td>
      </tr>
      <tr>
        <td>Order Generation Type</td>
        <td>{'Random'}</td>
      </tr>
      <tr>
        <td>Draft Order</td>
        <td>{league.settings.draft_settings.order}</td>
      </tr>
    </tbody>
  ) : (
    <></>
  );

  const rosterSettingsContent = league?.settings ? (
    <tbody>
      <tr>
        <td>Size Limit</td>
        <td>{league.settings.roster_settings.roster_size_limit}</td>
      </tr>
      <tr>
        <td>Total Roster Spots</td>
        <td>{league.settings.roster_settings.roster_size_limit}</td>
      </tr>
      <tr>
        <td>Starting QB Limit</td>
        <td>{league.settings.roster_settings.num_qb}</td>
      </tr>
      <tr>
        <td>Starting RB Limit</td>
        <td>{league.settings.roster_settings.num_rb}</td>
      </tr>
      <tr>
        <td>Starting WR Limit</td>
        <td>{league.settings.roster_settings.num_wr}</td>
      </tr>
      <tr>
        <td>Starting TE Limit</td>
        <td>{league.settings.roster_settings.num_te}</td>
      </tr>
      <tr>
        <td>Starting FLEX Limit</td>
        <td>{league.settings.roster_settings.num_flex}</td>
      </tr>
      <tr>
        <td>Starting DEF Limit</td>
        <td>{'No defense'}</td>
      </tr>
      <tr>
        <td>Starting K Limit</td>
        <td>{'No kicker'}</td>
      </tr>
    </tbody>
  ) : (
    <></>
  );

  const scheduleSettingsContent = league?.settings ? (
    <tbody>
      <tr>
        <td>First Week of Regular Season</td>
        <td>{`Week ${league.settings.schedule_settings.start_week}`}</td>
      </tr>

      <tr>
        <td>Last Week of Regular Season</td>
        <td>{`Week ${league.settings.schedule_settings.end_week}`}</td>
      </tr>
      <tr>
        <td>First Week of Playoffs</td>
        <td>{`Week ${league.settings.schedule_settings.playoff_start_week}`}</td>
      </tr>
      <tr>
        <td>Last Week of Playoffs</td>
        <td>{`Week ${league.settings.schedule_settings.playoff_end_week}`}</td>
      </tr>
      <tr>
        <td>Weeks Per Playoff Matchup</td>
        <td>{league.settings.schedule_settings.weeks_per_playoff_matchup}</td>
      </tr>
      <tr>
        <td>Number of Playoff Teams</td>
        <td>{league.settings.schedule_settings.num_playoff_teams}</td>
      </tr>
    </tbody>
  ) : (
    <></>
  );

  const transactionSettingsContent = league?.settings ? (
    <tbody>
      <tr>
        <td>Trade Deadline</td>
        {/* <td>{HuddleUpDate(new Date(league.settings.trade_settings.trade_deadline))}</td> */}
        <td>{'End of regular season'}</td>
      </tr>
      <tr>
        <td>Trade Review Period (Hours)</td>
        <td>{league.settings.trade_settings.review_period_hours}</td>
      </tr>
      <tr>
        <td>Votes Required to Veto Trade</td>
        <td>{league.settings.trade_settings.votes_to_veto_trade}</td>
      </tr>
      <tr>
        <td>Waiver Period (hours)</td>
        <td>{league.settings.waiver_settings.waiver_period_hours}</td>
      </tr>
      <tr>
        <td>Waiver Order Type</td>
        <td>{'Reverse Standings, resets weekly'}</td>
      </tr>
    </tbody>
  ) : (
    <></>
  );

  return (
    <div>
      <LeagueNavBar
        teamName={team ? team.name : ' '}
        teamId={team ? team.id : ' '}
        leagueName={league ? league.name : ' '}
        leagueId={Number(leagueId)}
        page='settings'
      />
      {leagueInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {leagueInfoFetchStatus === 'succeeded' && (
        <>
          <LeagueHomeNavigation
            leagueId={Number(leagueId)}
            leagueName={league?.name}
            leagueDescription={league?.description}
            page='settings'
          />
          <div className='bg-lightGrey pt-2 pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='content-center'>
              <LeagueSettingsCard content={basicSettingsContent} title={'General Settings'} />
              <LeagueSettingsCard content={draftSettingsContent} title={'Draft Settings'} />
              <LeagueSettingsCard content={rosterSettingsContent} title={'Roster Settings'} />
              <LeagueSettingsCard content={scheduleSettingsContent} title={'Schedule Settings'} />
              <LeagueSettingsCard
                content={transactionSettingsContent}
                title={'Transaction Settings'}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default index;
