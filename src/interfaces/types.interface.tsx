import { Player } from '@components/DraggableLineupTable/Draggable';

export enum ProposalStatus {
  pending = 'Pending',
  complete = 'Complete',
  rejected = 'Rejected',
  sent = 'SentToRelatedTeam',
}
export enum ProposalType {
  trade = 'Trade',
  add = 'Add',
  drop = 'Drop',
  addDrop = 'AddDrop',
}
export enum ProposalAction {
  approve = 'Approve',
  reject = 'Reject',
}
export interface TransactionPlayer {
  id: Number;
  joins_proposing_team: Boolean;
  player_id: Number;
  transaction_id: Number;
  player: Player;
}
export interface Proposal {
  related_team: any;
  proposing_team: any;
  id: Number;
  type: ProposalType;
  status: ProposalStatus;
  creation_date: Date;
  execution_date: Date;
  expiration_date: Date;
  proposing_team_id: Number;
  related_team_id: Number;
  week: Number;
  players: TransactionPlayer[];
  user: any;
  user_id: number;
  transaction_actions: any;
}

export interface Friend {
  name: string;
  // This subtext could probably be the mutual leagues count
  // subText: string;
  id: number;
}

export const TypeActivity = {
  Add: 'Add',
  Drop: 'Drop',
  DropAdd: 'AddDrop',
  Trade: 'Trade',
};

export const TypeStatus = {
  Pending: 'Pending',
  Completed: 'Complete',
  Rejected: 'Rejected',
};

export interface Activity {
  id: Number;
  teamId: Number;
  relatedTeamId: Number;
  status: string;
  type: string;
  createdDate: Date;
  expirationDate: Date;
  closingDate: Date;
  week: Number;
}

export interface Team {
  id: Number;
  rank: Number;
  name: string;
  managers: string;
  wins: Number;
  losses: Number;
}
