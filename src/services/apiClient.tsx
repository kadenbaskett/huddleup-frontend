import axios from 'axios';
import { respObj } from '@interfaces/respobj.interface';

const CONFIG = {
  // TODO how to setup https
  scheme: 'http',
  backendHost: 'localhost',
  backendPort: 8000,
};

const BASE_URL: string = `${CONFIG.scheme}://${CONFIG.backendHost}:${CONFIG.backendPort}`;

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

export async function createLeague(leageData: object) {
  const url = `${BASE_URL}/database/league`;
  return await postRequest(url, leageData);
}

export async function fetchLeaguePlayers(leagueId: number): Promise<respObj> {
  const url = `${BASE_URL}/database/players/league/${leagueId}`;
  return await getRequest(url);
}

export async function fetchPublicLeagues(): Promise<respObj> {
  const url = `${BASE_URL}/database/leagues/public`;
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
  userId = 1;
  const url = `${BASE_URL}/database/leagues/user/${userId}`;
  return await getRequest(url);
}
