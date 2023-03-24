import { Team } from '@interfaces/league.interface';
import { GiAmericanFootballHelmet } from 'react-icons/gi';

export interface DrafterProps {
  team: Team;
  auto: Boolean;
}
export default function Drafter({ team, auto }: DrafterProps) {
  return (
    <div className='bg-white rounded-xl h-full w-36 hover:drop-shadow-md grid place-items-center'>
      <div>
        <div
          className={`text-2xl ${
            auto ? 'text-darkGrey' : 'text-darkBlue'
          } font-varsity text-center`}
        >
          {team.name}
        </div>
      </div>

      {auto ? (
        <>
          <div>
            <div className='text-2xl text-darkGrey font-varsity text-center'>Auto Drafting</div>
          </div>
        </>
      ) : (
        <>
          <div className={`text-6xl ${auto ? 'text-darkGrey' : 'text-darkBlue'}`}>
            <GiAmericanFootballHelmet />
          </div>
        </>
      )}
    </div>
  );
}
