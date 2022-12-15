export interface League {
  id: number;
  name: string;
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
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
}
