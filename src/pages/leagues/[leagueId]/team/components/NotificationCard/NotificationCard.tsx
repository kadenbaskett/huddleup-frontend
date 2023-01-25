import { Button, Group } from '@mantine/core';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export interface NotificationCardProps {
  headline: string;
  text: string;
}

export function NotificationCard(props: NotificationCardProps) {
  const [collapsed, setCollapsed] = useState(false);
  const accept = () => {
    setCollapsed(true);
    // TODO: Send acceptance to backend
  };
  const reject = () => {
    setCollapsed(true);
    // TODO: Send rejection to backend
  };

  return (
    <>
      {!collapsed && (
        <div className='bg-white rounded-xl hover:drop-shadow-md'>
          <AiOutlineCloseCircle
            size={35}
            onClick={() => setCollapsed(true)}
            style={{ cursor: 'pointer', color: 'black' }}
          />
          <div className='text-xl font-OpenSans font-bold text-darkBlue pl-10 pr-10'>
            {props.headline}
          </div>
          <div className='text-xl font-OpenSans text-darkBlue pl-10 pr-10'>{props.text}</div>
          <Group className='pl-10 pb-4 pt-2'>
            <Button
              className='hover:bg-transparent hover:text-green text-xl hover:border hover:border-green rounded bg-green text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='sm'
              onClick={accept}
            >
              Accept
            </Button>
            <Button
              className='hover:bg-transparent hover:text-red text-xl hover:border hover:border-red rounded bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
              variant='default'
              size='sm'
              onClick={reject}
            >
              Reject
            </Button>
          </Group>
        </div>
      )}
    </>
  );
}
