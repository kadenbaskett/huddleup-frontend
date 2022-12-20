import React from 'react';

function FormInput({ label, inputId, placeholder = '' }) {
  return (
    <div className='w-full'>
      <label className='block mb-1 mt-6 text-sm leading-5 font-medium text-gray-700'>{label}</label>
      <input
        id={inputId}
        placeholder={placeholder}
        className='placeholder-gray-600 text-sm bg-gray-300 pl-3 py-2.5 border border-gray-300 text-black rounded-md focus:border-orange transition ease-in-out focus:outline-none block w-full'
      ></input>
    </div>
  );
}

export default FormInput;
