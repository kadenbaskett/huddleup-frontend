import React, {useState} from 'react';
import FormInput from '../../components/FormInput/FormInput';
import {useRouter} from 'next/router';
import {login} from '../../firebase';

function Login() {
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleRememberMe = (e) => {
    setRememberMe((current) => !current);
    console.log('Firing: ', rememberMe);
  };

  const handleLogin = async () => {
    // reset error
    setError('');

    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;

    const resp = await login(email, password);
    console.log('Object: ', resp);

    if (resp === 'success') {
      console.log('Login successful!');
      void router.push('/home');
    } else if (resp.includes('wrong-password')) {
      console.log('Incorrect password!');
      setError('Incorrect password');
    } else if (resp.includes('user-not-found')) {
      console.log(resp);
      setError('User not found for given email');
    } else {
      // general error
      console.log(resp);
      setError('Error logging in. Please try again');
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
            <FormInput
              label='Email'
              inputId='emailInput'
              placeholder='johnnyfootball@huddleup.com'
            ></FormInput>
            <FormInput label='Password' inputId='passwordInput'></FormInput>

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
                <a href='/forgotpassword' className='font-medium text-sm text-orange'>
                  Forgot password?
                </a>
              </div>
            </div>

            <div id='loginError' className='mt-4 text-red-700 font-md font-bold text-center'>
              {error}
            </div>

            <button
              onClick={handleLogin}
              className='mt-12 text-sm w-full h-full py-2.5 px-20 font-bold bg-orange text-white rounded-md'
            >
              Login
            </button>
            <div className='flex justify-center space-x-2 mt-2'>
              <p className='text-center text-sm font-medium text-gray-500'>
                Don't have an account?
              </p>
              <a href='/signup' className='text-center text-sm font-medium text-orange'>
                Sign up now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
