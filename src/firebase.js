import {initializeApp} from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    // TODO: get any additional information from our DB
    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const createAccount = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Response: ' + res);
    // TODO: add user to our database
    //   const user = res.user;

    return true;
  } catch (err) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const logout = () => {
  signOut(auth);
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {auth, login, createAccount, sendPasswordReset, logout};
