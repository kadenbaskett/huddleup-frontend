import { Team } from '@interfaces/league.interface';
import ActiveDrafter from './ActiveDrafter';
import Drafter from './Drafter';
import styles from './DraftBelt.module.css';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export interface DraftBeltProps {
  teams: Team[];
  time: number;
}

export default function DraftBelt({ teams, time }: DraftBeltProps) {
  const autoDraft = useSelector((state: StoreState) => state.draft.autoDraft);

  return (
    <>
      <div className='md:flex xl:flex h-40'>
        <div
          className='relative w-6/12 h-40 sm:h-52 bg-gradient-to-l from-lightGrey z-10'
          id={styles.abs}
        />
        <ActiveDrafter team={teams[0]} time={time} />
        <div className='overflow-x-hidden w-full md:w-1/2 lg:w-1/2 xl:w-3/4 z-0'>
          <div className='flex h-full'>
            {teams.slice(1, teams.length).map((team) => (
              <>
                <div className='pl-2'>
                  <Drafter
                    team={team}
                    auto={autoDraft.find((autoTeam) => autoTeam.teamId === team.id)?.auto}
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
