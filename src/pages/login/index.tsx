import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../../firebase/firebase';
import Link from 'next/link';
import { PasswordInput, TextInput } from '@mantine/core';

function Login() {
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRememberMe = () => {
    setRememberMe((current) => !current);
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;

    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      setLoading(false);
      setError('Invalid email entered');
    } else if (password === '') {
      setLoading(false);
      setError('Enter a password');
    } else {
      const resp = await login(email, password, rememberMe);

      if (resp === 'success') {
        console.log('Login successful!');
        void router.push('/home');
      } else if (resp.includes('wrong-password')) {
        setLoading(false);
        setError('Incorrect password');
      } else if (resp.includes('user-not-found')) {
        setLoading(false);
        setError('Account not found for email');
      } else {
        // general error
        setLoading(false);
        setError('Error logging in. Please try again');
      }
    }
  };

  return (
    <div className='bg-gray-300'>
      <div className='grid content-center h-screen place-items-center'>
        <div className='place-items-center h-auto w-5/12 content-center bg-white rounded-lg'>
          <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold'>
            LOGIN
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

            <PasswordInput
              id='passwordInput'
              placeholder='Password'
              label='Password'
              withAsterisk
              variant='filled'
              radius='md'
              className='py-2.5'
            />

            <div className=' mt-2 flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  onChange={handleRememberMe}
                  id='rememberMe'
                  type='checkbox'
                  className='w-4 h-4 border-black accent-orange'
                ></input>
                <label className='ml-2 block text-sm font-medium text-gray-500'>Remember me</label>
              </div>

              <div className='text-sm'>
                <Link href='/forgotpassword' className='font-medium text-sm text-orange'>
                  Forgot password?
                </Link>
              </div>
            </div>

            <div id='loginError' className='mt-4 text-red font-md font-bold text-center'>
              {error}
            </div>

            <button
              disabled={loading}
              onClick={handleLogin}
              className={
                (loading ? 'bg-gray-500 ' : 'bg-orange ') +
                'mt-12 text-sm w-full h-full py-2.5 px-20 font-bold text-white rounded-md'
              }
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className='flex justify-center space-x-2 mt-2'>
              <p className='text-center text-sm font-medium text-gray-500'>
                Don't have an account?
              </p>
              <Link href='/signup' className='text-center text-sm font-medium text-orange'>
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
