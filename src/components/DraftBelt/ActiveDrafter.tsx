import { Team } from '@interfaces/league.interface';
import { createManagerString } from '@services/helpers';
import { GiAmericanFootballHelmet } from 'react-icons/gi';
import Timer from './Timer';

export interface ActiveDrafterProps {
  team: Team;
  time: number;
}
export default function ActiveDrafter({ team, time }: ActiveDrafterProps) {
  return (
    <div
      className={`bg-white rounded-xl p-2 transition ease-in-out duration-200 ${
        time < 1 ? '-translate-x-1' : ''
      } max-w-lg border-4 border-green hover:drop-shadow-md overflow-hidden`}
    >
      <div className='flex pl-2 items-center'>
        <div className='text-7xl text-green pr-5 '>
          <GiAmericanFootballHelmet />
        </div>
        <div>
          <div className='text-4xl text-green font-varsity'>{team.name}</div>
          <div className='text-sm text-darkBlue'>{createManagerString(team.managers)}</div>
        </div>
        <div className='pl-2'>
          <Timer time={time} />
        </div>
      </div>
    </div>
  );
}
