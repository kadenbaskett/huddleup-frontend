import axios from 'axios';
import { respObj } from '@interfaces/respobj.interface';
import { ProposalAction } from '@interfaces/types.interface';

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URI;

async function getRequest(url: string): Promise<respObj> {
  try {
    const resp = await axios.get(url);
    return { data: resp.data, error: null };
  } catch (err) {
    console.log(err);
    return { data: null, error: err };
  }
}

async function postRequest(url: string, data: object): Promise<respObj> {
  try {
    const resp = await axios.post(url, data);
    return { data: resp.data, error: null };
  } catch (err) {
    console.log(err);
    return { data: null, error: err };
  }
}

export async function addUser(username: string, email: string) {
  const url = `${BASE_URL}/database/user`;
  return await postRequest(url, { username, email });
}

export async function createLeague(leageData: object) {
  const url = `${BASE_URL}/database/league`;
  return await postRequest(url, leageData);
}

export async function createTeam(teamData: object) {
  const url = `${BASE_URL}/database/team`;
  return await postRequest(url, teamData);
}

export async function deleteTeam(teamData: object) {
  const url = `${BASE_URL}/database/deleteTeam`;
  return await postRequest(url, teamData);
}

export async function userToTeam(userToTeamData: object) {
  const url = `${BASE_URL}/database/userToTeam`;
  return await postRequest(url, userToTeamData);
}

export async function removeUserFromTeam(removeUserFromTeamData: object) {
  const url = `${BASE_URL}/database/removeUserFromTeam`;
  return await postRequest(url, removeUserFromTeamData);
}

export async function editLineup(rosterPlayerId: number, newPosition: string) {
  const data = { rosterPlayerId, newPosition };
  const url = `${BASE_URL}/database/roster/editLineup`;
  return await postRequest(url, data);
}

export async function fillLeague(leagueId: number) {
  const data = { leagueId };
  const url = `${BASE_URL}/database/league/fill`;
  return await postRequest(url, data);
}

export async function startDraft(leagueId: number) {
  const data = { leagueId };
  const url = `${BASE_URL}/database/league/startDraft`;
  return await postRequest(url, data);
}

export async function proposeTrade(
  sendPlayerIds: number[],
  recPlayerIds: number[],
  proposeRosterId: number,
  relatedRosterId: number,
  proposeTeamId: number,
  relatedTeamId: number,
  userId: number,
  week: number,
) {
  const url = `${BASE_URL}/database/roster/proposeTrade`;
  const data = {
    sendPlayerIds,
    recPlayerIds,
    proposeRosterId,
    relatedRosterId,
    proposeTeamId,
    relatedTeamId,
    userId,
    week,
  };
  return await postRequest(url, data);
}

export async function addPlayer(
  addPlayerId: number,
  addPlayerExternalId: number,
  rosterId: number,
  teamId: number,
  userId: number,
  week: number,
) {
  const url = `${BASE_URL}/database/roster/addPlayer`;
  const data = {
    addPlayerId,
    addPlayerExternalId,
    rosterId,
    teamId,
    userId,
    week,
  };
  return await postRequest(url, data);
}

export async function dropPlayer(
  playerId: number,
  rosterId: number,
  teamId: number,
  userId: number,
  week: number,
) {
  const url = `${BASE_URL}/database/roster/dropPlayer`;
  const data = {
    playerId,
    rosterId,
    teamId,
    userId,
    week,
  };
  return await postRequest(url, data);
}

export async function transactionAction(
  action: ProposalAction,
  transactionId: Number,
  userId: Number,
) {
  const url = `${BASE_URL}/database/transaction/action`;
  const data = {
    action,
    transactionId,
    userId,
  };
  return await postRequest(url, data);
}

export async function addDropPlayer(
  addPlayerId: number,
  addPlayerExternalId: number,
  dropPlayerIds: number[],
  rosterId: number,
  teamId: number,
  userId: number,
  week: number,
) {
  const url = `${BASE_URL}/database/roster/addDropPlayer`;
  const data = {
    addPlayerId,
    addPlayerExternalId,
    dropPlayerIds,
    rosterId,
    teamId,
    userId,
    week,
  };
  return await postRequest(url, data);
}

export async function fetchUser(email: string) {
  const url = `${BASE_URL}/database/user/${email}`;
  return await getRequest(url);
}

export async function fetchLeaguePlayers(leagueId: number): Promise<respObj> {
  const url = `${BASE_URL}/database/players/league/${leagueId}`;
  return await getRequest(url);
}

export async function fetchPublicLeagues(): Promise<respObj> {
  const url = `${BASE_URL}/database/leagues/public`;
  return await getRequest(url);
}

export async function fetchPrivateLeagues(): Promise<respObj> {
  const url = `${BASE_URL}/database/leagues/private`;
  return await getRequest(url);
}

export async function fetchTimeframe(): Promise<respObj> {
  const url = `${BASE_URL}/database/timeframe`;
  return await getRequest(url);
}

export async function fetchLeagueInfo(leagueId: number): Promise<respObj> {
  const url = `${BASE_URL}/database/league/${leagueId}`;
  return await getRequest(url);
}

export async function fetchUserLeagues(userId: number): Promise<respObj> {
  const url = `${BASE_URL}/database/leagues/user/${userId}`;
  return await getRequest(url);
}

export async function fetchUserTeams(userId: number): Promise<respObj> {
  const url = `${BASE_URL}/database/teams/user/${userId}`;
  return await getRequest(url);
}

export async function fetchNews(amountOfNews: number): Promise<respObj> {
  const url = `${BASE_URL}/database/news/${amountOfNews}`;
  return await getRequest(url);
}
