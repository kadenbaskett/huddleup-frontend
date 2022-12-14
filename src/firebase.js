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
} from 'firebase/auth';

// test Huddle Up Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC3VhVqA-zR0mOA9-sUwTw-0JohqqIxPCY',
  authDomain: 'test-fanhuddle.firebaseapp.com',
  projectId: 'test-fanhuddle',
  storageBucket: 'test-fanhuddle.appspot.com',
  messagingSenderId: '526044775750',
  appId: '1:526044775750:web:d8242c7328c52df3b55147',
  measurementId: 'G-NX81Y3HZPH',
};

// Initialize Firebase app
initializeApp(firebaseConfig);
const auth = getAuth();

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
  signOut(auth);
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
