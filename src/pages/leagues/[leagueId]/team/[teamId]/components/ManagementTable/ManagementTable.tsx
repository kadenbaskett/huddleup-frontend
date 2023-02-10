import { Button, Group, Table } from '@mantine/core';
import { transactionAction } from '@services/apiClient';
import { proposalExecutionerString, proposalToString } from '@services/ProposalHelpers';
import { Proposal, ProposalAction, ProposalStatus } from '../../types';
import { showNotification } from '@mantine/notifications';
import { AppDispatch } from '@store/store';
import { useDispatch } from 'react-redux';
import { setPollStatus } from '@store/slices/leagueSlice';
import { SLICE_STATUS } from '@store/slices/common';

export interface ManagementTableProps {
  proposals: Proposal[];
  userId: Number;
}

export function ManagementTable({ proposals, userId }: ManagementTableProps) {
  const dispatch = useDispatch<AppDispatch>();

  const update = () => {
    dispatch(setPollStatus(SLICE_STATUS.NEEDS_UPDATE));
  };

  const rows = proposals.map((p: Proposal) => (
    <tr key={p.id.toString()}>
      <td>{p.week.toString()}</td>
      <td>{p.user.username}</td>
      <td>{proposalToString(p)}</td>
      <td>
        {p.status === ProposalStatus.complete && (
          <div className='text-xl font-openSans text-green'>Approved</div>
        )}
        {p.status === ProposalStatus.rejected && (
          <div className='text-xl font-openSans text-red'>Rejected</div>
        )}
        {p.status === ProposalStatus.pending && (
          <div className='text-xl font-openSans text-yellow'>Pending</div>
        )}
      </td>
      <td>
        {p.status === ProposalStatus.pending ? (
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
                update();
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
                update();
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
            <th>Teammate</th>
            <th>Proposal</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
