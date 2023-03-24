import { Team } from '@interfaces/league.interface';
import ActiveDrafter from './ActiveDrafter';
import Drafter from './Drafter';
import styles from './DraftBelt.module.css';

export interface DraftBeltProps {
  teams: Team[];
  time: number;
}

export default function DraftBelt({ teams, time }: DraftBeltProps) {
  return (
    <>
      <div className='flex h-40'>
        <div className='w-6/12 h-40 bg-gradient-to-l from-lightGrey' id={styles.abs} />
        <ActiveDrafter team={teams[0]} time={time} />
        <div className='overflow-x-hidden'>
          <div className='flex h-full'>
            {teams.slice(1, teams.length).map((team) => (
              <>
                <div className='p-1'>
                  <Drafter
                    team={team}
                    auto={team.id % 2 === 0}
                    time={time}
                    nextUp={team.id === teams[1].id}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
