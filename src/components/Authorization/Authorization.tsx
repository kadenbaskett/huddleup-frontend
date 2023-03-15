import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import { handleUserInitThunk, logoutUser } from '@store/slices/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export default function Authorization({ children }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // bug causing useEffect and then onAuthStateChanged to happen twice
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Auth change: Logged in with firebase');
        dispatch(handleUserInitThunk(user.email));
      } else {
        console.log('Auth change: Logged out');
        dispatch(logoutUser({}));
      }
    });
  }, [auth]);

  return children;
}
