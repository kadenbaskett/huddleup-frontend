export interface League {
  id: number;
  name: string;
  token: number;
  description: string;
  settings: Settings;
  teams: Team[];
}

export interface Settings {
  num_teams: number;
  max_players: number;
  min_players: number;
  scoring_settings: Scoring;
}

export interface Scoring {
  points_per_reception: number;
}

export interface Team {
  id: number;
  token: string;
  name: string;
  wins: number;
  losses: number;
  managers: any[];
  league: League;
  rosters: Roster[];
}

export interface Roster {
  id: number;
  week: number;
  season: number;
  players: RosterPlayer[];
}

export interface RosterPlayer {
  id: number;
  external_id: number;
  position: string;
  player: any;
}
