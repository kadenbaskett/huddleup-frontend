import { Button, Group, Table } from '@mantine/core';
import { Proposal, ProposalStatus } from '../../types';

export interface ManagementTableProps {
  proposals: Proposal[];
}
export function ManagementTable(props: ManagementTableProps) {
  const rows = props.proposals.map((p: Proposal) => (
    <tr key={p.id.toString()}>
      <td>{p.name}</td>
      <td>{p.proposal}</td>
      <td>
        {p.status === ProposalStatus.approved && (
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
        <Group>
          <Button
            className='hover:bg-transparent hover:text-green text-xl hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
            variant='default'
            size='sm'
            disabled={p.status !== ProposalStatus.pending}
          >
            Approve
          </Button>
          <Button
            className='hover:bg-transparent hover:text-red text-xl hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
            variant='default'
            size='sm'
            disabled={p.status !== ProposalStatus.pending}
          >
            Reject
          </Button>
        </Group>
      </td>
    </tr>
  ));

  return (
    <>
      <Table>
        <thead>
          <tr>
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