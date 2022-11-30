import React, {useState} from 'react';
import FormInput from '../../components/FormInput/FormInput';
import axios from 'axios';
import {useRouter} from 'next/router';

function Login() {
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleRememberMe = () => {
    setRememberMe((current) => !current);
  };

  const handleLogin = async function () {
    // reset error
    setError('');
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;

    // call to HuddleUp backend authenticate

    // TODO: send rememberme to firebase and turn on
    console.log(rememberMe);

    await axios
      .post('/users/loginUser', {
        email,
        password,
      })
      .then((resp) => {
        console.log('JWT:', resp.data);
        localStorage.setItem('jwt', resp.data);
        // redirect to home after succesful login
        void router.push('/home');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // handle unauthorized
          setError('Invalid email or password');
          // setErrorCSS('');
        } else {
          // handle error loggin in
          setError('Error logging in please try again');
          // setErrorCSS('');
        }
      });
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
