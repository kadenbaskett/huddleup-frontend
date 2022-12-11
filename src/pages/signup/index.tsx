/* eslint-disable @typescript-eslint/no-misused-promises */
import FormInput from '../../components/FormInput/FormInput';
import {createAccount} from '../../firebase';
import {useRouter} from 'next/router';

function Signup() {
  const router = useRouter();

  const handleCreateAccount = async () => {
    const username = (document.getElementById('usernameInput') as HTMLInputElement).value;
    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;

    if (await createAccount(username, email, password)) {
      // account created succesfully
      console.log('Account created succesfully!');
      void router.push('/home');
    } else {
      // error creating the account
      console.log('Account creation failed!');
    }
  };

  return (
    <div className='grid content-center h-screen place-items-center'>
      <div className='place-items-center h-auto w-5/12 content-center bg-white rounded-lg'>
        <h1 className='font-varsity text-darkBlue mt-6 text-center text-form-title font-bold'>
          CREATE ACCOUNT
        </h1>
        <div className='mb-8 mx-auto w-3/4'>
          <FormInput
            label='Username'
            inputId='usernameInput'
            placeholder='johnnyfootball69'
          ></FormInput>
          <FormInput
            label='Email'
            inputId='emailInput'
            placeholder='johnnyfootball@huddleup.com'
          ></FormInput>
          <FormInput label='Password' inputId='passwordInput'></FormInput>
          <FormInput label='Confirm Password' inputId='confirmPasswordInput'></FormInput>

          {/* <div id='loginError' className='mt-4 text-red-700 font-md font-bold text-center'>
            {error}
          </div> */}

          <button
            onClick={handleCreateAccount}
            className='mt-6 text-sm w-full h-full py-2.5 px-20 font-bold bg-orange text-white rounded-md'
          >
            Sign up
          </button>
          <div className='flex justify-center space-x-2 mt-2'>
            <p className='text-center text-sm font-medium text-gray-500'>Have an account?</p>
            <a href='/login' className='text-center text-sm font-medium text-orange'>
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
