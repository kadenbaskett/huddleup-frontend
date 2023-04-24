import { Button, Group, Table } from '@mantine/core';
import { transactionAction } from '@services/apiClient';
import {
  proposalExecutionerString,
  proposalToString,
  relatedTeamTradeString,
} from '@services/ProposalHelpers';
import { Proposal, ProposalAction, ProposalStatus } from '@interfaces/types.interface';
import { showNotification } from '@mantine/notifications';

export interface ManagementTableProps {
  proposals: Proposal[];
  userId: Number;
  teamId: Number;
}

export function ManagementTable({ proposals, teamId, userId }: ManagementTableProps) {
  const proposedRows = proposals
    .filter((p) => p.proposing_team_id === teamId)
    .map((p: Proposal) => (
      <tr key={p.id.toString()}>
        <td>{p.week.toString()}</td>
        <td>{p.user.username}</td>
        <td>{proposalToString(p)}</td>
        <td>
          {p.status === ProposalStatus.complete && (
            <div className='text-xl font-openSans text-green'>Completed</div>
          )}
          {p.status === ProposalStatus.rejected && (
            <div className='text-xl font-openSans text-red'>Rejected</div>
          )}
          {(p.status === ProposalStatus.pending || p.status === ProposalStatus.sent) && (
            <div className='text-xl font-openSans text-yellow'>Pending</div>
          )}
        </td>
        <td>
          {p.status === ProposalStatus.pending && p.user_id !== userId ? (
            <Group>
              <Button
                className='hover:bg-transparent hover:text-green text-xl hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='sm'
                onClick={async () => {
                  showNotification({
                    message: 'Proposal Approved',
                  });
                  await transactionAction(ProposalAction.approve, p.id, userId);
                }}
              >
                Approve
              </Button>
              <Button
                className='hover:bg-transparent hover:text-red text-xl hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='sm'
                onClick={async () => {
                  showNotification({
                    message: 'Proposal Rejected',
                  });
                  await transactionAction(ProposalAction.reject, p.id, userId);
                }}
              >
                Reject
              </Button>
            </Group>
          ) : (
            <>{proposalExecutionerString(p)}</>
          )}
        </td>
      </tr>
    ));
  const relatedRows = proposals
    .filter((p) => p.proposing_team_id !== teamId)
    .map((p: Proposal) => (
      <tr key={p.id.toString()}>
        <td>{p.week.toString()}</td>
        <td>{p.proposing_team.name}</td>
        <td>{relatedTeamTradeString(p)}</td>
        <td>
          {p.status === ProposalStatus.complete && (
            <div className='text-xl font-openSans text-green'>Completed</div>
          )}
          {p.status === ProposalStatus.rejected && (
            <div className='text-xl font-openSans text-red'>Rejected</div>
          )}
          {(p.status === ProposalStatus.pending || p.status === ProposalStatus.sent) && (
            <div className='text-xl font-openSans text-yellow'>Pending</div>
          )}
        </td>
        <td>
          {p.status === ProposalStatus.sent ? (
            <Group>
              <Button
                className='hover:bg-transparent hover:text-green text-xl hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='sm'
                onClick={async () => {
                  showNotification({
                    message: 'Proposal Approved',
                  });
                  await transactionAction(ProposalAction.approve, p.id, userId);
                }}
              >
                Approve
              </Button>
              <Button
                className='hover:bg-transparent hover:text-red text-xl hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='sm'
                onClick={async () => {
                  showNotification({
                    message: 'Proposal Rejected',
                  });
                  await transactionAction(ProposalAction.reject, p.id, userId);
                }}
              >
                Reject
              </Button>
            </Group>
          ) : (
            <>{proposalExecutionerString(p)}</>
          )}
        </td>
      </tr>
    ));

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Week</th>
            <th>Initiator</th>
            <th>Proposal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{[...relatedRows, ...proposedRows]}</tbody>
        {!relatedRows.length && !proposedRows.length ? (
          <div className='py-4'>No proposals to add, drop, or trade players</div>
        ) : (
          <></>
        )}
      </Table>
    </>
  );
}
