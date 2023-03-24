import AddDropPlayerConfirmPopup from '@components/AddDropPlayerConfirmPopup/AddDropPlayerConfirmPopup';
import AddDropPlayerPopup from '@components/AddDropPlayerPopup/AddDropPlayerPopup';
import PlayerPopup from '@components/PlayerPopup/PlayerPopup';
import TradePlayerPopup from '@components/TradePlayerPopup/TradePlayerPopup';
import { League, Team } from '@interfaces/league.interface';
import { Grid, SegmentedControl } from '@mantine/core';
import { getTeamScore, getTeamThatOwnsPlayer } from '@services/helpers';
import { StoreState } from '@store/store';
import { useEffect, useState } from 'react';
import { GiAmericanFootballHelmet } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { OtherMatchups } from '../MatchupsOtherMatchups/OtherMatchups';
import { PlayerCard } from '../MatchupsPlayerCard/PlayerCard';

export interface ThisWeekCardProps {
  league: League;
  team: Team;
  currentWeek: Number;
}

export function ThisWeekCard({ league, currentWeek, team }: ThisWeekCardProps) {
  const user = useSelector((state: StoreState) => state.user.userInfo);

  const [week, setWeek] = useState(currentWeek);
  const [userRoster, setUserRoster] = useState(undefined);
  const [otherTeam, setOtherTeam] = useState(undefined);
  const [otherRoster, setOtherRoster] = useState(undefined);
  const [homeScore, setHomeScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);

  // Trade popup
  const [tradePopupOpen, setTradePopupOpen] = useState(false);
  const [tradeRoster, setTradeRoster] = useState(null);

  // Are we adding or dropping the player?
  const [addingPlayer, setAddingPlayer] = useState(false);

  // Confirm popup
  const [addDropConfirmPopupOpen, setAddDropConfirmPopupOpen] = useState(false);

  // Add Drop popup
  const [addDropPopupOpen, setAddDropPopupOpen] = useState(false);

  // Player popup
  const [playerPopupOpen, setPlayerPopupOpen] = useState(false);

  // Used for all popups
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const newMatchup = league?.matchups.find((matchup) => {
      return (
        matchup.week === week &&
        (matchup.away_team_id === team.id || matchup.home_team_id === team.id)
      );
    });
    const newUserRoster = team?.rosters.find((roster) => {
      return roster.week === week;
    });
    setUserRoster(newUserRoster);
    const otherTeamId =
      newMatchup?.home_team_id === team?.id ? newMatchup?.away_team_id : newMatchup?.home_team_id;
    const newOtherTeam = league?.teams.find((t) => {
      return t.id === otherTeamId;
    });
    setOtherTeam(newOtherTeam);
    const newOtherRoster = newOtherTeam?.rosters.find((roster) => {
      return roster.week === currentWeek;
    });

    setOtherRoster(newOtherRoster);

    setHomeScore(getTeamScore(newUserRoster, week));

    setOtherScore(getTeamScore(newOtherRoster, week));
  }, [week]);

  const userTeamManagers: String[] = team.managers.map((manager) => {
    return manager.user.username;
  });

  // On close methods of popups
  const onTradePopupClose = () => {
    setTradePopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropPopupClose = () => {
    setAddDropPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onAddDropConfirmClose = () => {
    setAddDropConfirmPopupOpen(false);
    setSelectedPlayer(null);
  };

  const onPlayerPopupClose = () => {
    setPlayerPopupOpen(false);
  };

  // When a player is clicked
  const onPlayerClick = (event, p) => {
    event.preventDefault();
    setSelectedPlayer(p);
    setPlayerPopupOpen(true);
  };

  // Takes the necessary action to add/drop/trade for player
  const takePlayerAction = (player) => {
    setSelectedPlayer(player);

    const playerTeam = getTeamThatOwnsPlayer(player, currentWeek, league.id);
    const myRoster = getMyRoster();
    const isMyPlayer = playerTeam?.id === team.id;

    // Nobody owns the player -> they are a free agent
    if (!playerTeam) {
      // TODO use league settings instead of CONFIG
      // No need to drop a player as part of the transaction if your roster isn't full
      if (myRoster.players.length < league.settings.roster_settings.roster_size_limit) {
        setAddingPlayer(true);
        setAddDropConfirmPopupOpen(true);
      } else {
        setAddDropPopupOpen(true);
      }
    }
    // I own the player - so drop them
    else if (isMyPlayer) {
      setAddingPlayer(false);
      setAddDropConfirmPopupOpen(true);
    }
    // Another team owns this player - so propose a trade
    else {
      const tradeTeam = league.teams.find((t) => t.id === playerTeam.id);
      const tradeRoster = tradeTeam.rosters.find((r) => r.week === currentWeek);

      setTradeRoster(tradeRoster);
      setTradePopupOpen(true);
    }
  };

  const getMyRoster = () => {
    return team ? team.rosters.find((r) => r.week === currentWeek) : [];
  };
  const weeks = new Array(Number(currentWeek) - 1);
  for (let i = 1; i <= Number(currentWeek); i++) {
    weeks[i - 1] = { label: i.toString(), value: i.toString() };
  }
  return (
    <>
      <PlayerPopup
        player={selectedPlayer}
        opened={playerPopupOpen}
        onClose={onPlayerPopupClose}
        onPlayerAction={takePlayerAction}
        leagueId={league.id}
      />

      <AddDropPlayerPopup
        roster={getMyRoster()}
        player={selectedPlayer}
        opened={addDropPopupOpen}
        onClose={onAddDropPopupClose}
        userId={user.id}
      />

      <TradePlayerPopup
        otherRoster={tradeRoster}
        myRoster={getMyRoster()}
        player={selectedPlayer}
        opened={tradePopupOpen}
        onClose={onTradePopupClose}
        userId={user.id}
        week={currentWeek}
      />
      <AddDropPlayerConfirmPopup
        roster={getMyRoster()}
        isAdd={addingPlayer}
        player={selectedPlayer}
        opened={addDropConfirmPopupOpen}
        onClose={onAddDropConfirmClose}
        userId={user.id}
      />

      <div className='bg-white rounded-xl hover:drop-shadow-md'>
        <div className='p-3'>
          <div className='font-varsity text-darkBlue text-2xl'>Week:</div>
          <SegmentedControl
            fullWidth
            value={week.toString()}
            data={weeks}
            onChange={(e) => setWeek(Number(e))}
          />
        </div>
        <div className='pl-5 pr-5 pt-2'>
          <div className='text-xl font-varisty'>
            <div className='grid place-items-center'>
              <div className='flex'>
                <div className='text-5xl text-darkBlue pr-5'>
                  <GiAmericanFootballHelmet />
                </div>
                <div className='font-varsity text-darkBlue text-2xl pr-5 pt-2'>{`Week ${week.toString()}`}</div>
                <div className='text-5xl transform -scale-x-100 text-darkBlue'>
                  <GiAmericanFootballHelmet />
                </div>
              </div>
              <div className='flex'>
                <div className='grid place-items-end'>
                  <div className='pr-5'>
                    <div className='md:text-4xl text-2xl font-varsity text-darkBlue pl-5 text-right'>
                      {team.name}
                    </div>
                    <div className='md:text-lg text-sm font-openSans text-orange text-right pl-5'>
                      {userTeamManagers.join(', ')}
                    </div>
                  </div>
                </div>
                <div className='grid place-items-center font-varsity text-darkBlue md:text-6xl text-3xl'>
                  {homeScore}
                </div>
                <div className='grid place-items-center font-varsity text-darkBlue md:text-6xl text-3xl'>
                  -
                </div>
                <div className='grid place-items-center font-varsity text-darkBlue md:text-6xl text-3xl'>
                  {otherScore}
                </div>
                <div className='grid place-items-start'>
                  <div className='pl-5'>
                    <div className='md:text-4xl text-2xl font-varsity text-darkBlue pr-5'>
                      {otherTeam?.name}
                    </div>
                    <div className='md:text-lg text-sm font-openSans text-orange text-left pr-5'>
                      {otherTeam?.managers
                        .map((manager) => {
                          return manager.user.username;
                        })
                        .join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='pt-2'>
              <div className='text-xl font-varsity text-darkBlue text-center'>Quarterbacks:</div>
              <Grid>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {userRoster?.players
                      .filter((player) => {
                        return player.position === 'QB' && {};
                      })
                      .map((qb) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, qb.player)}>
                            <PlayerCard player={qb.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {otherRoster?.players
                      .filter((player) => {
                        return player.position === 'QB' && {};
                      })
                      .map((qb) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, qb.player)}>
                            <PlayerCard player={qb.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
              </Grid>
            </div>
            <div className='pt-2'>
              <div className='text-xl font-varsity text-darkBlue text-center'>Wide Receivers:</div>
              <Grid>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {userRoster?.players
                      .filter((player) => {
                        return player.position === 'WR' && {};
                      })
                      .map((wr) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, wr.player)}>
                            <PlayerCard player={wr.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {otherRoster?.players
                      .filter((player) => {
                        return player.position === 'WR' && {};
                      })
                      .map((wr) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, wr.player)}>
                            <PlayerCard player={wr.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
              </Grid>
            </div>
            <div className='pt-2'>
              <div className='text-xl font-varsity text-darkBlue text-center'>Running Backs:</div>
              <Grid>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {userRoster?.players
                      .filter((player) => {
                        return player.position === 'RB' && {};
                      })
                      .map((rb) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, rb.player)}>
                            <PlayerCard player={rb.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {otherRoster?.players
                      .filter((player) => {
                        return player.position === 'RB' && {};
                      })
                      .map((rb) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, rb.player)}>
                            <PlayerCard player={rb.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
              </Grid>
            </div>
            <div className='pt-2'>
              <div className='text-xl font-varsity text-darkBlue text-center'>Tight End:</div>
              <Grid>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {userRoster?.players
                      .filter((player) => {
                        return player.position === 'TE' && {};
                      })
                      .map((te) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, te.player)}>
                            <PlayerCard player={te.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {otherRoster?.players
                      .filter((player) => {
                        return player.position === 'TE' && {};
                      })
                      .map((te) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, te.player)}>
                            <PlayerCard player={te.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
              </Grid>
            </div>
            <div className='pt-2'>
              <div className='text-xl font-varsity text-darkBlue text-center'>Flex:</div>
              <Grid>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {userRoster?.players
                      .filter((player) => {
                        return player.position === 'FLEX' && {};
                      })
                      .map((f) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, f.player)}>
                            <PlayerCard player={f.player} currentWeek={week} />
                          </a>{' '}
                        </>
                      ))}
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className='bg-lightGrey rounded-xl p-2'>
                    {otherRoster?.players
                      .filter((player) => {
                        return player.position === 'FLEX' && {};
                      })
                      .map((f) => (
                        <>
                          <a href='#' onClick={(e) => onPlayerClick(e, f.player)}>
                            <PlayerCard player={f.player} currentWeek={week} />
                          </a>
                        </>
                      ))}
                  </div>
                </Grid.Col>
              </Grid>
            </div>
            <div className='pt-5'>
              <OtherMatchups league={league} userTeamId={team.id} week={week} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
