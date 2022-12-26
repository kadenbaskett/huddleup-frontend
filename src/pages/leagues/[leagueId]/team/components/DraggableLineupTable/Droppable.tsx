import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div className='p-1'>
      <div className={`${isOver ? 'bg-green' : 'bg-lightGrey'} p-5 rounded-xl`} ref={setNodeRef}>
        {props.children}
      </div>
    </div>
  );
}
