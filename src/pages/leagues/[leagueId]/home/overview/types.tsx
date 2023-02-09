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
