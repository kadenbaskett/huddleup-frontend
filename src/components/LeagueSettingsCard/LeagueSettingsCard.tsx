import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Table } from '@mantine/core';

export interface LeagueSettingsCardProps {
  title: string;
  content: ReactJSXElement;
}

export default function LeagueSettingsCard({ title, content }: LeagueSettingsCardProps) {
  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md mt-10'>
      <div className='p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'>
        {title}
      </div>
      <Table className={'settings-table'} striped highlightOnHover withColumnBorders>
        {content}
      </Table>
    </div>
  );
}
