import { addUser } from '@services/apiClient';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// eslint-disable-next-line no-unused-vars
initializeApp(firebaseConfig);
const auth = getAuth();

const login = async (email, password, rememberMe) => {
  try {
    // LOCAL = explicict sign out is needed | SESSION = persists during current tab
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);

    return 'success';
  } catch (err) {
    return err.message;
  }
};

const createAccount = async (username, email, password) => {
  try {
    // add user to DB
    const addUserResp = await addUser(username, email);

    if (addUserResp.data == null) {
      return addUserResp.error.response.data;
    }

    const createResp = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(createResp.user, { displayName: username });

    return 'success';
  } catch (err) {
    return err.message;
  }
};

const logout = async () => {
  await signOut(auth);
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return 'success';
  } catch (err) {
    return err.message;
  }
};

export { auth, login, createAccount, sendPasswordReset, logout };
