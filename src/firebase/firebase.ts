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
  onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log('firing');

    // ...
  } else {
    // User is signed out
    // ...
  }
});

const login = async (email, password, rememberMe) => {
  try {
    // LOCAL = explicict sign out is needed | SESSION = persists during current tab
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);

    // TODO: get any additional information from our DB
    return 'success';
  } catch (err) {
    return err.message;
  }
};

const createAccount = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // TODO: add user to our database
    const user = res.user;
    console.log(user); // here to cancel error on user for not being used(linter)

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
