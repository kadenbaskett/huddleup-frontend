/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Table } from '@mantine/core';
import React from 'react';
import { TypeActivity } from '@interfaces/types.interface';
import { AiFillMinusCircle } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { FaExchangeAlt } from 'react-icons/fa';
import { proposalToString } from '@services/ProposalHelpers';

export interface RecentActivityTableProps {
  activities: any[];
}

export function RecentActivityTable(props: RecentActivityTableProps) {
  const getActivityDetail = (p) => {
    if (p.type === TypeActivity.Trade) {
      const s = `${p.proposing_team.name} ${proposalToString(p)} from ${p.related_team.name}`;
      return s.replace('Traded', 'traded');
    } else {
      const s = `${p.proposing_team.name} ${proposalToString(p)}`;
      return s.replace('Add', 'added').replace('Drop', 'dropped');
    }
  };

  const rows = props.activities.map((p) => (
    <tr key={p.id.toString()}>
      <td>{new Date(p.execution_date).toDateString()}</td>
      <td>
        {p.type === TypeActivity.Add && (
          <IoMdAddCircle
            style={{
              color: 'green',
            }}
            size='25px'
          />
        )}
        {p.type === TypeActivity.Drop && (
          <AiFillMinusCircle
            style={{
              color: 'red',
            }}
            size='25px'
          />
        )}
        {p.type === TypeActivity.DropAdd && (
          <div className='inline-flex'>
            <IoMdAddCircle
              style={{
                color: 'green',
              }}
              size='25px'
            />
            <AiFillMinusCircle
              style={{
                color: 'red',
              }}
              size='25px'
            />
          </div>
        )}
        {p.type === TypeActivity.Trade && (
          <FaExchangeAlt
            style={{
              color: 'orange',
            }}
            size='25px'
          />
        )}
      </td>
      <td>{getActivityDetail(p)}</td>
    </tr>
  ));
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
        Recent Activity
      </div>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
        <>
          {rows.length ? (
            <></>
          ) : (
            <>
              <div className='font-bold text-lg text-darkBlue p-2'>No recent activity</div>
            </>
          )}
        </>
      </Table>
    </div>
  );
}
