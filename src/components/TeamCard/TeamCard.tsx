import { compareProposals } from '@services/ProposalHelpers';
import { useState } from 'react';
import { Proposal } from '@interfaces/types.interface';
import { DraggableLineupTable } from '../DraggableLineupTable/DraggableLineupTable';
import { ManagementTable } from '../ManagementTable/ManagementTable';

export interface TeamCardProps {
  currentWeek: Number;
  rosters: any;
  proposals: Proposal[];
  isMyTeam: boolean;
  userId: Number;
  teamId: Number;
}

export function TeamCard(props: TeamCardProps) {
  console.log('Team card re render');
  const [lineup, setLineup] = useState(true);
  const [management, setManagement] = useState(false);

  const selectLineup = () => {
    setManagement(false);
    setLineup(true);
  };

  const selectManagement = () => {
    setLineup(false);
    setManagement(true);
  };

  return (
    <div className='bg-white rounded-xl hover:drop-shadow-md'>
      {/* header */}
      <div className='flex bg-darkBlue rounded-t-xl pt-5 pl-5'>
        <ul className='flex flex-wrap text-sm font-medium text-center text-gray-500'>
          <li className='mr-2'>
            <div
              onClick={selectLineup}
              aria-current='page'
              className={`inline-block ${
                lineup ? 'bg-white text-darkBlue' : 'bg-darkBlue text-white'
              } p-4 rounded-t-lg active text-2xl font-varsity cursor-pointer`}
            >
              Lineup
            </div>
          </li>
          {props.isMyTeam ? (
            <li className='mr-2'>
              <div
                onClick={selectManagement}
                aria-current='page'
                className={`inline-block ${
                  management ? 'bg-white text-darkBlue' : 'bg-darkBlue text-white'
                } p-4 rounded-t-lg active text-2xl font-varsity cursor-pointer`}
              >
                Management
              </div>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      {/* content */}
      {lineup && props.rosters ? (
        <div className='p-5'>
          <DraggableLineupTable
            rosters={props.rosters}
            currentWeek={props.currentWeek.toString()}
            disabled={!props.isMyTeam}
            proposals={[...props.proposals].sort(compareProposals)}
          />
        </div>
      ) : (
        <></>
      )}
      {management && props.isMyTeam && (
        <div className='p-5'>
          <ManagementTable
            userId={props.userId}
            proposals={[...props.proposals].sort(compareProposals)}
            teamId={props.teamId}
          />
        </div>
      )}
    </div>
  );
}
