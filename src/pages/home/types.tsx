export interface Friend {
  name: string;
  // This subtext could probably be the mutual leagues count
  // subText: string;
  id: number;
}

export interface News {
  news: string;
}

export interface Team {
  id: Number;
  rank: Number;
  name: string;
  wins: Number;
  losses: Number;
}
