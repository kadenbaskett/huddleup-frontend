import { Button, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { transactionAction } from '@services/apiClient';
import { getProposalHeadlineString, proposalToString } from '@services/ProposalHelpers';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Proposal, ProposalAction } from '@interfaces/types';

export interface NotificationCardProps {
  proposal: Proposal;
  userId: number;
}

export function NotificationCard({ proposal, userId }: NotificationCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {!collapsed && (
        <div className='bg-white rounded-xl hover:drop-shadow-md'>
          <AiOutlineCloseCircle
            size={35}
            onClick={() => setCollapsed(true)}
            style={{ cursor: 'pointer', color: 'black' }}
          />
          <div className='text-xl font-OpenSans font-bold text-darkBlue pl-10 pr-10'>
            {getProposalHeadlineString(proposal)}
          </div>
          <div className='text-xl font-OpenSans text-darkBlue pl-10 pr-10'>
            {proposalToString(proposal)}
          </div>
          <Group className='pl-10 pb-4 pt-2'>
            <Button
              className='hover:bg-transparent hover:text-green text-xl hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='sm'
              onClick={async () => {
                showNotification({
                  title: 'ayo',
                  message: 'Proposal Approved',
                });
                setCollapsed(true);
                await transactionAction(ProposalAction.approve, proposal.id, userId);
              }}
            >
              Accept
            </Button>
            <Button
              className='hover:bg-transparent hover:text-red text-xl hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='sm'
              onClick={async () => {
                // setCollapsed(true);
                showNotification({
                  message: 'Proposal Rejected',
                });
                // await transactionAction(ProposalAction.reject, proposal.id, userId);
              }}
            >
              Reject
            </Button>
          </Group>
        </div>
      )}
    </>
  );
}
