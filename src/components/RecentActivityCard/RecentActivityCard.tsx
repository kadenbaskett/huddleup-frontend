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
// this will also need a player dropped id and a player added id
// also a date of the activity to display when this occured

export default function RecentActivityCard(props: recentActivityCardProps) {
  if (props.type === 'drop') {
    return (
      <div className='p-2'>
        <div className='inline-flex font-OpenSans'>
          <AiFillMinusCircle
            style={{
              color: 'red',
            }}
            size='25px'
          />
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
        <div className='inline-flex font-OpenSans'>
          <IoMdAddCircle
            style={{
              color: 'green',
            }}
            size='25px'
          />
          This is an add on team {props.toTeamId.toString()}
        </div>
        <div>
          The from team is {props.fromTeamId.toString()} and this will have to be the case for non
          trades
        </div>
      </div>
    );
  } else if (props.type === 'trade') {
    return (
      <div className='p-2'>
        <div className='inline-flex font-OpenSans'>
          <FaExchangeAlt
            style={{
              color: 'orange',
            }}
            size='25px'
          />
          This is a trade to team {props.toTeamId.toString()} from team{' '}
          {props.fromTeamId.toString()}
        </div>
      </div>
    );
  } else {
    return (
      <div className='p-2'>
        <div className='inline-flex font-OpenSans'>
          <FaExchangeAlt
            style={{
              color: 'orange',
            }}
            size='25px'
          />
          This is a add and a drop on team {props.fromTeamId.toString()}
        </div>
      </div>
    );
  }
}
