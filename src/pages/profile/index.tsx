import { useRouter } from 'next/router';
import { logout } from '../../firebase/firebase';

function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    void router.push('/');
  };

  return (
    <>
      <div className='grid place-items-center justify-center h-screen'>
        <button
          onClick={handleLogout}
          className='rounded-md p-2 font-varsity bg-orange text-white text-2xl'
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
