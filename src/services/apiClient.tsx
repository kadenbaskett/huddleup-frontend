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

export async function fetchPlayers(): Promise<respObj> {
  const url = `${BASE_URL}/database/players`;
  return await getRequest(url);
}
