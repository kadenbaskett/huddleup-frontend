import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import { handleUserInitThunk, logoutUser } from '@store/slices/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

export default function Authorization({ children }) {
  const dispatch = useDispatch<AppDispatch>();

  let userPollTimeoutID = null;

  const startUserSliceUpdateLoop = (email: string) => {
    dispatch(handleUserInitThunk(email));
    clearTimeout(userPollTimeoutID);
    userPollTimeoutID = setInterval(() => dispatch(handleUserInitThunk(email)), 5000);
  };

  useEffect(() => {
    // bug causing useEffect and then onAuthStateChanged to happen twice
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Auth change: Logged in with firebase');
        startUserSliceUpdateLoop(user.email);
      } else {
        console.log('Auth change: Logged out');
        clearTimeout(userPollTimeoutID);
        dispatch(logoutUser({}));
      }
    });
  }, [auth]);

  return children;
}
