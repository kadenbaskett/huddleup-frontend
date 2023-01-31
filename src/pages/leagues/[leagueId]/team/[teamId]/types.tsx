import { Player } from './components/DraggableLineupTable/Draggable';

export enum ProposalStatus {
  pending = 'Pending',
  complete = 'Complete',
  rejected = 'Rejected',
}
export enum ProposalType {
  trade = 'Trade',
  add = 'Add',
  drop = 'Drop',
  addDrop = 'AddDrop',
}
export interface TransactionPlayer {
  id: Number;
  joins_proposing_team: Boolean;
  player_id: Number;
  transaction_id: Number;
  player: Player;
}
export interface Proposal {
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
}
