import React from 'react';
import { AiFillMinusCircle } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { FaExchangeAlt } from 'react-icons/fa';

export interface recentActivityCardProps {
  type: string;
  fromTeamId: Number;
  toTeamId: Number;
}
// type of activity: drop, add, trade

export default function RecentActivityCard(props: recentActivityCardProps) {
  if (props.type === 'drop') {
    return (
      <div className='p-2'>
        <div className=' '>
          <AiFillMinusCircle />
          This is a drop on team {props.toTeamId.toString()}
        </div>
        <div>
          The from team is {props.fromTeamId.toString()} and this will have to be the case for non
          trades
        </div>
      </div>
    );
  } else if (props.type === 'add') {
    return (
      <div className='p-2'>
        <div className=' '>
          <IoMdAddCircle />
          This is an add on team {props.toTeamId.toString()}
        </div>
        <div>
          The from team is {props.fromTeamId.toString()} and this will have to be the case for non
          trades
        </div>
      </div>
    );
  } else {
    return (
      <div className='p-2'>
        <div className=' '>
          <FaExchangeAlt />
          This is a trade to team {props.toTeamId.toString()} from team{' '}
          {props.fromTeamId.toString()}
        </div>
      </div>
    );
  }
}
