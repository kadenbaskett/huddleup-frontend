export interface DraftPlayer {
  player_id: number;
  team_id: number;
  league_id: number;
  pick_number: number;
}

export interface QueuePlayer {
  player_id: number;
  team_id: number;
  league_id: number;
  order: number;
}

export interface DraftOrder {
  teamId: number;
  pick: number;
}

export interface AutoDraft {
  teamId: number;
  auto: boolean;
}
