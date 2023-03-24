import { DataTable } from 'mantine-datatable';
import React from 'react';

export interface DraftHistoryProps {
  players: any[];
}

export default function DraftHistory(props: DraftHistoryProps) {
  return (
    <>
      <div className='bg-white rounded-xl hover:drop-shadow-md'>
        <div className='p-5 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
          History
        </div>
        <div className='hover:shadow-inner-xl p-5'>
          <DataTable
            className='bg-white rounded-xl hover:drop-shadow-md'
            withBorder
            highlightOnHover
            striped
            withColumnBorders
            records={props.players}
            columns={[
              {
                accessor: 'id',
                title: 'Player',
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
