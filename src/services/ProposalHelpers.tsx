import { Proposal, ProposalStatus, ProposalType } from '@interfaces/types.interface';

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
    const recievedPlayers = proposal.players
      .filter((p) => p.joins_proposing_team === true)
      .map((p) => `${p.player.first_name} ${p.player.last_name}`);
    const offeredPlayers = proposal.players
      .filter((p) => p.joins_proposing_team === false)
      .map((p) => `${p.player.first_name} ${p.player.last_name}`);
    sentence = `Trade${
      proposal.status === ProposalStatus.complete || proposal.status === ProposalStatus.rejected
        ? 'd'
        : ''
    } ${offeredPlayers.join(', ')} to ${String(
      proposal.related_team.name,
    )} for ${recievedPlayers.join(', ')}`;
    sentence = `Trade${
      proposal.status === ProposalStatus.complete || proposal.status === ProposalStatus.rejected
        ? 'd'
        : ''
    } ${offeredPlayers.join(', ')} to ${String(
      proposal.related_team.name,
    )} for ${recievedPlayers.join(', ')}`;
  } else if (proposal.type === ProposalType.add) {
    // add
    sentence = `Add ${proposal.players[0].player.first_name} ${proposal.players[0].player.last_name}`;
  } else if (proposal.type === ProposalType.drop) {
    // drop
    sentence = `Drop ${proposal.players[0].player.first_name} ${proposal.players[0].player.last_name}`;
  } else if (proposal.type === ProposalType.addDrop) {
    // add drop
    const droppingPlayers = proposal.players
      .filter((p) => p.joins_proposing_team === false)
      .map((p) => `${p.player.first_name} ${p.player.last_name}`);
    const addingPlayers = proposal.players
      .filter((p) => p.joins_proposing_team === true)
      .map((p) => `${p.player.first_name} ${p.player.last_name}`);
    sentence = `Drop ${droppingPlayers.join(', ')} and add ${addingPlayers.join(', ')}`;
  }
  return sentence;
}

export function relatedTeamTradeString(proposal: Proposal): string {
  let sentence;
  const offeredPlayers = proposal.players
    .filter((p) => p.joins_proposing_team === true)
    .map((p) => `${p.player.first_name} ${p.player.last_name}`);
  const recievedPlayers = proposal.players
    .filter((p) => p.joins_proposing_team === false)
    .map((p) => `${p.player.first_name} ${p.player.last_name}`);
  sentence = `Trade${
    proposal.status === ProposalStatus.complete || proposal.status === ProposalStatus.rejected
      ? 'd'
      : ''
  } ${offeredPlayers.join(', ')} to ${String(
    proposal.proposing_team.name,
  )} for ${recievedPlayers.join(', ')}`;
  sentence = `Trade${
    proposal.status === ProposalStatus.complete || proposal.status === ProposalStatus.rejected
      ? 'd'
      : ''
  } ${offeredPlayers.join(', ')} to ${String(
    proposal.proposing_team.name,
  )} for ${recievedPlayers.join(', ')}`;
  return sentence;
}

export function proposalExecutionerString(proposal: Proposal): string {
  if (proposal?.transaction_actions?.length > 0) {
    const transactionUser: string = proposal?.transaction_actions[0].user.username;
    let s = `${
      proposal.status === ProposalStatus.complete || ProposalStatus.sent ? 'Approved' : 'Rejected'
    } by ${transactionUser}`;
    if (proposal?.status === 'SentToRelatedTeam') {
      s += `, offer sent to ${String(proposal?.related_team.name)}`;
    }
    return s;
  }
  return '';
}
