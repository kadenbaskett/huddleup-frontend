import { Team } from '@interfaces/league.interface';
import { GiAmericanFootballHelmet } from 'react-icons/gi';

export interface DrafterProps {
  team: Team;
  auto: Boolean;
  time: number;
  nextUp: Boolean;
}
export default function Drafter({ team, auto, time, nextUp }: DrafterProps) {
  const colors = auto ? 'text-darkGrey' : nextUp ? 'text-orange' : 'text-darkBlue';
  return (
    <div
      className={`bg-white rounded-xl h-full w-36 hover:drop-shadow-md grid place-items-center ${
        nextUp && !auto ? 'border-4 border-orange' : ''
      }`}
    >
      <div>
        <div className={`text-2xl ${colors} font-varsity text-center`}>{team.name}</div>
      </div>

      {auto ? (
        <>
          <div>
            <div className='text-2xl text-darkGrey font-varsity text-center'>Auto Drafting</div>
          </div>
        </>
      ) : (
        <>
          <div className={`text-6xl ${colors}`}>
            <GiAmericanFootballHelmet />
          </div>
        </>
      )}
    </div>
  );
}
