import { Proposal, ProposalType } from '@pages/leagues/[leagueId]/team/types';

// comparator to sort proposals by creation date
export function compareProposals(a, b) {
  if (a?.creation_date < b?.creation_date) return 1;
  if (a?.creation_date > b?.creation_date) return -1;
  return 0;
}

// create the proposal headline for a proposal notification
export function getProposalHeadlineString(proposal: Proposal): string {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${proposal.user.username} would like to:`;
}

// translate a proposal into proper language
export function proposalToString(proposal: Proposal): string {
  let sentence;
  if (proposal.type === ProposalType.trade) {
    const offeredPlayers = proposal.players
      .filter((p) => p.joins_proposing_team === false)
      .map((p) => `${p.player.first_name} ${p.player.last_name}`);
    const recievedPlayers = proposal.players
      .filter((p) => p.joins_proposing_team === true)
      .map((p) => `${p.player.first_name} ${p.player.last_name}`);
    sentence = `Trade ${offeredPlayers.join(', ')} for ${recievedPlayers.join(', ')}`;
  } else if (proposal.type === ProposalType.add) {
    // add
  } else if (proposal.type === ProposalType.drop) {
    // drop
  } else if (proposal.type === ProposalType.addDrop) {
    // add drop
  }
  return sentence;
}
