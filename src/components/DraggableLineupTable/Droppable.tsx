import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { numQB, numWR, numRB, numTE, numFLEX } from 'static';

export function Droppable({ id, children }) {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
  });

  // determine if the active player is allowed to be dropped in this container
  let canDrop = false;
  // TODO no QB in FLEX
  if (active?.data.current.position === id || id === 'FLEX' || id === 'Bench') canDrop = true;

  // does the container have the correcet number of children?
  let neededPlayers = 0;
  switch (id) {
    case 'QB':
      neededPlayers = numQB;
      break;
    case 'WR':
      neededPlayers = numWR;
      break;
    case 'RB':
      neededPlayers = numRB;
      break;
    case 'TE':
      neededPlayers = numTE;
      break;
    case 'FLEX':
      neededPlayers = numFLEX;
      break;
    default:
      break;
  }

  return (
    <div className='p-1'>
      <div
        className={`${isOver && canDrop ? 'bg-green' : 'bg-lightGrey'} ${
          neededPlayers !== children.length && id !== 'Bench' ? 'border-red' : ''
        } border-2 p-2 rounded-xl hover:drop-shadow-md z-0`}
        ref={setNodeRef}
      >
        {children}
      </div>
      {children.length > neededPlayers && id !== 'Bench' && (
        <div className='text-red font-openSans'>{`${
          children.length - neededPlayers
        } too many players`}</div>
      )}
      {children.length < neededPlayers && id !== 'Bench' && (
        <div className='text-red font-openSans'>{`Need ${
          neededPlayers - children.length
        } more player${neededPlayers - children.length > 1 ? 's' : ''}`}</div>
      )}
    </div>
  );
}
