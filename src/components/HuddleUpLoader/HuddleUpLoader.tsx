import { Center, Loader } from '@mantine/core';

export function HuddleUpLoader() {
  return (
    <div className='p-10'>
      <Center>
        <Loader color='orange' size='xl' />
      </Center>
    </div>
  );
}
