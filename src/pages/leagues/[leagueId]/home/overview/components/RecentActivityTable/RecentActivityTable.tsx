import { Table } from '@mantine/core';
import React from 'react';
import { Activity, TypeActivity } from '../../types';
import { AiFillMinusCircle } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { FaExchangeAlt } from 'react-icons/fa';

export interface RecentActivityTableProps {
  activities: any[];
}

export function RecentActivityTable(props: RecentActivityTableProps) {
  const rows = props.activities.map((p: Activity) => (
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
      <td></td>
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
      </Table>
    </div>
  );
}
