import DraftQueue from '@components/DraftQueue/DraftQueue';
import DraftRoster from '@components/DraftRoster/DraftRoster';
import React, { useState } from 'react';

export interface DraftRosterAndQueueCardProps {
  teams: any[];
  currUser: any;
}

export interface TeamData {
  value: string;
  label: string;
}

export default function DraftRosterAndQueueCard(props: DraftRosterAndQueueCardProps) {
  const [roster, setRoster] = useState(true);
  const [queue, setQueue] = useState(false);

  const selectLineup = () => {
    setQueue(false);
    setRoster(true);
  };

  const selectManagement = () => {
    setRoster(false);
    setQueue(true);
  };

  const teamData: TeamData[] = props.teams?.map((team) => {
    return {
      value: team.token,
      label: team.name,
    };
  });

  const myTeam = props.teams.find((team) =>
    team.managers.find((manager) => manager.user_id === props.currUser.id),
  );

  const dontShow = false;

  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      {/* header */}
      <div className='flex bg-darkBlue rounded-t-xl pl-5'>
        <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500 pt-2'>
          <li className='mr-2'>
            <div
              onClick={selectLineup}
              aria-current='page'
              className={
                'p-4 font-varsity justify-left text-2xl bg-darkBlue text-white rounded-t-xl'
              }
            >
              Roster
            </div>
          </li>
          {dontShow && (
            <li className='mr-2'>
              <div
                onClick={selectManagement}
                aria-current='page'
                className={`inline-block ${
                  queue ? 'bg-white text-darkBlue' : 'bg-darkBlue text-white'
                } p-4 rounded-t-lg active text-xl font-varsity cursor-pointer`}
              >
                Queue
              </div>
            </li>
          )}
        </ul>
      </div>
      {/* content */}

      {roster ? (
        <div className='p-5'>
          <DraftRoster myTeam={myTeam} teamData={teamData} teams={props.teams} />
        </div>
      ) : (
        <></>
      )}

      {queue && (
        <div className='p-5'>
          <DraftQueue />
        </div>
      )}
    </div>
  );
}
