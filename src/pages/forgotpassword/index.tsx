import React, {useState} from 'react';
import FormInput from '../../components/FormInput/FormInput';
import {sendPasswordReset} from '../../firebase';
// import {useRouter} from 'next/router';

function ForgotPassword() {
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(true);
  // const router = useRouter();

  const handleReset = async () => {
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;

    // check that the input is a valid email
    const re =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      const resp = await sendPasswordReset(email);

      console.log('Response: ', resp);

      if (resp === 'success') {
        setIsError(false);
        setMessage('Password reset link sent');
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
  };

  return (
    <div className='bg-gray-300'>
      <div className='grid content-center h-screen place-items-center'>
        <div className='place-items-center h-auto w-5/12 content-center bg-white rounded-lg'>
          <h1 className='font-varsity text-darkBlue mt-10 text-center text-form-title font-bold'>
            FORGOT PASSWORD
          </h1>
          <div className='mb-10 mx-auto w-3/4'>
            <FormInput
              label='Email'
              inputId='emailInput'
              placeholder='johnnyfootball@huddleup.com'
            ></FormInput>

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
              className='mt-12 text-sm w-full h-full py-2.5 px-20 font-bold bg-orange text-white rounded-md'
            >
              Reset my password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
