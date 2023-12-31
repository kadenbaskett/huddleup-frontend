import React, { useState } from 'react';
import { sendPasswordReset } from '../../firebase/firebase';
import { useRouter } from 'next/router';
import { TextInput } from '@mantine/core';

function ForgotPassword() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleReset = async () => {
    setLoading(true);
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;

    // check that the input is a valid email
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      const resp = await sendPasswordReset(email);

      if (resp === 'success') {
        setIsError(false);
        setMessage('Password reset link sent. Redirecting to login page in 5 seconds');
        setTimeout(() => {
          void router.push('/login');
        }, 5000);
      } else if (resp.includes('user-not-found')) {
        setIsError(true);
        setMessage('User not found for email');
      } else if (resp.includes('missing-email')) {
        setIsError(true);
        setMessage('Please enter an email address');
      } else if (resp.includes('invalid-email')) {
        setIsError(true);
        setMessage('Email entered is not a valid email address');
      } else {
        // general error
        setIsError(true);
        setMessage('Error sending password reset link');
      }
    } else {
      setIsError(true);
      setMessage('Entered email is not valid');
    }

    setLoading(false);
  };

  return (
    <div className='bg-gray-300'>
      <div className='grid content-center h-screen place-items-center'>
        <div className='place-items-center h-auto w-5/12 content-center bg-white rounded-lg'>
          <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold'>
            FORGOT PASSWORD
          </h1>
          <div className='mb-10 mx-auto w-3/4'>
            <TextInput
              id='emailInput'
              placeholder='johnnyfootball@huddleup.com'
              label='Email'
              withAsterisk
              variant='filled'
              radius='md'
              className='py-2.5'
            />

            <div
              id='loginError'
              className={
                isError
                  ? 'mt-4 font-md font-bold text-center text-red-700'
                  : 'mt-4 font-md font-bold text-center text-green'
              }
            >
              {message}
            </div>

            <button
              onClick={handleReset}
              disabled={loading}
              className={
                (loading ? 'bg-gray-500 ' : 'bg-orange ') +
                'mt-12 text-sm w-full h-full py-2.5 px-20 font-bold bg-orange text-white rounded-md'
              }
            >
              {loading ? 'Sending reset email...' : 'Reset my password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
