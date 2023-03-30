import { Modal, TextInput } from '@mantine/core';
import React, { useState } from 'react';

export default function ProfilePopup({ opened, onClose, user, myProfile, otherUsername }) {
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);

  return (
    <>
      <Modal opened={opened} onClose={() => onClose()} title={'Huddle Up Profile'} centered>
        {myProfile && (
          <div>
            <div>
              <TextInput
                label='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='pt-5'>
              <TextInput label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        )}

        {!myProfile && (
          <>
            <TextInput label='Username' value={otherUsername} disabled />
            <div>other persons profile page</div>
          </>
        )}
      </Modal>
    </>
  );
}
