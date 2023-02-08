export enum TypeActivity {
  Add,
  Drop,
  DropAdd,
  Trade,
}

export enum TypeStatus {
  Pending,
  Completed,
  Rejected,
}

export interface Activity {
  id: Number;
  teamId: Number;
  relatedTeamId: Number;
  status: TypeStatus;
  type: TypeActivity;
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
