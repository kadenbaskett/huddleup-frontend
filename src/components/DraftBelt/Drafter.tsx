import { Team } from '@interfaces/league.interface';
import { GiAmericanFootballHelmet } from 'react-icons/gi';
import styles from './DraftBelt.module.css';

export interface DrafterProps {
  team: Team;
  auto: Boolean;
  time: number;
  nextUp: Boolean;
}
export default function Drafter({ team, auto, time, nextUp }: DrafterProps) {
  const colors = auto ? 'text-darkGrey' : 'text-darkBlue';
  return (
    <div
      className='bg-white rounded-xl md:h-full hover:drop-shadow-md grid place-items-center overflow-x-hidden'
      id={time < 1 && nextUp ? styles.shrunk : styles.full}
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
