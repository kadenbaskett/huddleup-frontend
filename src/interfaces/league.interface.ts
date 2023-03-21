export interface League {
  id: number;
  name: string;
  token: string;
  description: string;
  settings: Settings;
  matchups: any[];
  teams: Team[];
}

export interface Settings {
  num_teams: number;
  max_players: number;
  min_players: number;
  scoring_settings: ScoringSettings;
  roster_settings: RosterSettings;
}

export interface ScoringSettings {
  points_per_reception: number;
}

export interface RosterSettings {
  num_qb: number;
  num_rb: number;
  num_wr: number;
  num_te: number;
  num_flex: number;
  roster_size_limit: number;
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
