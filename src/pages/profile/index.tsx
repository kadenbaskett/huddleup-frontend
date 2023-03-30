import { HuddleUpLoader } from '@components/HuddleUpLoader/HuddleUpLoader';
import { Grid, TextInput } from '@mantine/core';
import { StoreState } from '@store/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { logout } from '../../firebase/firebase';

function Profile() {
  const userInfoFetchStatus = useSelector((state: StoreState) => state.user.status);
  const user = useSelector((state: StoreState) => state.user);

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    void router.push('/');
  };

  return (
    <>
      {userInfoFetchStatus !== 'succeeded' && <HuddleUpLoader />}
      {userInfoFetchStatus === 'succeeded' && (
        <>
          <div className='bg-lightGrey pl-10 pr-10 sm:pl-5 sm:pr-5 xl:pl-40 xl:pr-40 min-h-screen'>
            <div className='font-varsity text-5xl text-orange'>{user.userInfo.username}</div>
            <Grid>
              <Grid.Col>
                <TextInput value={user.userInfo.username} label='Username' disabled />
              </Grid.Col>

              <Grid.Col>
                <TextInput value={user.userInfo.email} label='Email' disabled />
              </Grid.Col>

              <Grid.Col span={12}>
                <div className='grid place-items-center justify-center h-screen'>
                  <button
                    onClick={handleLogout}
                    className='rounded-md p-2 font-varsity bg-orange text-white text-2xl'
                  >
                    Logout
                  </button>
                </div>
              </Grid.Col>
            </Grid>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
