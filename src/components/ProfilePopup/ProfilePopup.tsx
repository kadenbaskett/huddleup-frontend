import { Button, Modal, TextInput } from '@mantine/core';
import React, { useState } from 'react';

export default function ProfilePopup({ opened, onClose, user, handleLogout }) {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);

  const handleClick = () => {
    onClose();
    handleLogout();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => onClose()}
        title={'Huddle Up Profile'}
        centered
        overlayProps={{
          blur: 3,
        }}
      >
        <div>
          <div>
            <TextInput
              label='Username'
              value={username}
              disabled
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='pt-5'>
            <TextInput
              label='Email'
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className='grid place-items-center justify-center pt-5'>
          <Button
            onClick={() => handleClick()}
            className='hover:bg-transparent hover:text-orange text-md font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
            variant='default'
            size='xl'
            radius='md'
          >
            Logout
          </Button>
        </div>
      </Modal>
    </>
  );
}
