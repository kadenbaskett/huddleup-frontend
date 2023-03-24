export interface DraftPlayer {
  id: number;
  player_id: number;
  team_id: number;
  league_id: number;
}

export interface DraftQueue {
  id: number;
  player_id: number;
  team_id: number;
  league_id: number;
  order: number;
}
