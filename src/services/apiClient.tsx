import axios from 'axios';
import { respObj } from '@interfaces/respobj.interface';
import { ProposalAction } from '@interfaces/types.interface';
import { getUsersJWT } from '../firebase/firebase';

const BASE_URL: string = process.env.NEXT_PUBLIC_API_URI;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const jwt = await getUsersJWT();
  if (jwt) {
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
    config.headers['Access-Control-Allow-Headers'] =
      'Origin, X-Requested-With, Content-Type, Accept, Authorization';
    config.headers.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

async function getRequest(url: string): Promise<respObj> {
  try {
    const resp = await api.get(url);
    return { data: resp.data, error: null };
  } catch (err) {
    console.log(err);
    return { data: null, error: err };
  }
}

async function postRequest(url: string, data: object): Promise<respObj> {
  try {
    const resp = await api.post(url, data);
    return { data: resp.data, error: null };
  } catch (err) {
    console.log(err);
    return { data: null, error: err };
  }
}

export async function addUser(username: string, email: string) {
  const url = '/database/user';
  return await postRequest(url, { username, email });
}

export async function createLeague(leageData: object) {
  const url = '/database/league';
  return await postRequest(url, leageData);
}

export async function createTeam(teamData: object) {
  const url = '/database/team';
  return await postRequest(url, teamData);
}

export async function deleteTeam(teamData: object) {
  const url = '/database/deleteTeam';
  return await postRequest(url, teamData);
}

export async function userToTeam(userToTeamData: object) {
  const url = '/database/userToTeam';
  return await postRequest(url, userToTeamData);
}

export async function removeUserFromTeam(removeUserFromTeamData: object) {
  const url = '/database/removeUserFromTeam';
  return await postRequest(url, removeUserFromTeamData);
}

export async function editLineup(rosterPlayerId: number, newPosition: string) {
  const data = { rosterPlayerId, newPosition };
  const url = '/database/roster/editLineup';
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
  const url = '/database/roster/proposeTrade';
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
  const url = '/database/roster/addPlayer';
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
  const url = '/database/roster/dropPlayer';
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
  const url = '/database/transaction/action';
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
  const url = '/database/roster/addDropPlayer';
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
  const url = `/database/user/${email}`;
  return await getRequest(url);
}

export async function fetchLeaguePlayers(leagueId: number): Promise<respObj> {
  const url = `/database/players/league/${leagueId}`;
  return await getRequest(url);
}

export async function fetchPublicLeagues(): Promise<respObj> {
  const url = '/database/leagues/public';
  return await getRequest(url);
}

export async function fetchPrivateLeagues(): Promise<respObj> {
  const url = '/database/leagues/private';
  return await getRequest(url);
}

export async function fetchTimeframe(): Promise<respObj> {
  const url = '/database/timeframe';
  return await getRequest(url);
}

export async function fetchLeagueInfo(leagueId: number): Promise<respObj> {
  const url = `/database/league/${leagueId}`;
  return await getRequest(url);
}

export async function fetchUserLeagues(userId: number): Promise<respObj> {
  const url = `/database/leagues/user/${userId}`;
  return await getRequest(url);
}

export async function fetchUserTeams(userId: number): Promise<respObj> {
  const url = `/database/teams/user/${userId}`;
  return await getRequest(url);
}

export async function fetchNews(amountOfNews: number): Promise<respObj> {
  const url = `/database/news/${amountOfNews}`;
  return await getRequest(url);
}

export async function fetchDraftPort(leagueId: number): Promise<respObj> {
  const url = `${BASE_URL}/database/league/getDraftSocket/${leagueId}`;
  console.log('sending api request');
  return await getRequest(url);
}
