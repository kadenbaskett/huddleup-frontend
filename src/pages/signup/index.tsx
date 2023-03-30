import { useState } from 'react';
import { createAccount } from '../../firebase/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PasswordInput, TextInput } from '@mantine/core';

function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCreateAccount = async () => {
    setLoading(true);
    setError('');

    const username = (document.getElementById('usernameInput') as HTMLInputElement).value;
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPasswordInput') as HTMLInputElement)
      .value;

    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (username.includes(' ')) {
      setLoading(false);
      setError('Username cannot contain spaces');
    } else if (password !== confirmPassword) {
      setLoading(false);
      setError('Passwords didnt match try again');
    } else if (!re.test(email)) {
      setLoading(false);
      setError('Invalid email entered');
    } else {
      const resp = await createAccount(username, email, password);

      if (resp === 'success') {
        console.log('Account created succesfully!');
        void router.push('/home');
      } else {
        setLoading(false);
        setError(resp);
      }
    }
  };

  return (
    <div className='bg-gray-300'>
      <div className='grid content-center h-screen place-items-center'>
        <div className='place-items-center h-auto w-5/12 content-center bg-white rounded-lg'>
          <h1 className='font-varsity text-darkBlue mt-6 text-center text-form-title font-bold'>
            CREATE ACCOUNT
          </h1>
          <div className='mb-8 mx-auto w-3/4'>
            <TextInput
              id='usernameInput'
              placeholder='johnnyfootball69'
              label='Username'
              withAsterisk
              variant='filled'
              radius='md'
              className='py-2.5 focus:border-orange'
            />

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

            <PasswordInput
              id='confirmPasswordInput'
              placeholder='Password'
              label='Confirm Password'
              withAsterisk
              variant='filled'
              radius='md'
              className='py-2.5'
            />
            <div id='error' className='mt-4 text-red font-md font-bold text-center'>
              {error}
            </div>

            <button
              disabled={loading}
              onClick={handleCreateAccount}
              className={
                (loading ? 'bg-gray-500 ' : 'bg-orange ') +
                'mt-6 text-sm w-full h-full py-2.5 px-20 font-bold text-white rounded-md'
              }
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
            <div className='flex justify-center space-x-2 mt-2'>
              <p className='text-center text-sm font-medium text-gray-500'>Have an account?</p>
              <Link href='/login' className='text-center text-sm font-medium text-orange'>
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
