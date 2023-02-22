import { Button, Group, Modal } from '@mantine/core';
import { deleteTeam } from '@services/apiClient';
import router from 'next/router';
import React from 'react';

export interface DeleteATeamPopUpProps {
  team: any;
  opened: boolean;
  closed: any;
}

export default function DeleteATeamPopUp(props: DeleteATeamPopUpProps) {
  console.log('props.team', props.team);

  const preventDefault = (f) => (e) => {
    e.preventDefault();
    f(e);
  };

  const handleSubmit = preventDefault(async () => {
    await deleteTeam(props.team);
    await router.push({
      pathname: '/home',
    });
  });

  return (
    <>
      <Modal opened={props.opened} onClose={() => props.closed()} withCloseButton={false} centered>
        <div className='p-4 font-varsity flex justify-center text-2xl text-darkBlue rounded-t-xl'>
          Delete your team?
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center'>
            <Group>
              <Button
                className='hover:bg-transparent hover:text-red text-xl font-bold hover:border hover:border-red bg-red text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='sm'
                formMethod='POST'
                type='submit'
              >
                Delete
              </Button>

              <Button
                className='hover:bg-transparent hover:text-orange text-xl font-bold hover:border hover:border-orange bg-orange text-white border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0'
                variant='default'
                size='sm'
                onClick={() => props.closed()}
              >
                Cancel
              </Button>
            </Group>
          </div>
        </form>
      </Modal>
    </>
  );
}
