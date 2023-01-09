export enum ProposalStatus {
  pending,
  approved,
  rejected,
}
export interface Proposal {
  id: Number;
  name: string;
  proposal: string;
  status: ProposalStatus;
}
