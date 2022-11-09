import React from 'react';
import './MyFriends.module.css';

export default function MyFriends() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="flex justify-center p-6 text-6xl bg-gray-100 border-2 border-gray-300 rounded-xl">
        My Friends
      </div>
      <div className="flex justify-center p-3 text-3xl bg-blue-100 border-2 border-gray-300 rounded-xl">
        Joseph Cockman
      </div>
      <div className="flex justify-center p-3 text-3xl bg-red-100 border-2 border-gray-300 rounded-xl">
        Jake Dickwhiteyo
      </div>
      <div className="flex justify-center p-3 text-3xl bg-yellow-100 border-2 border-gray-300 rounded-xl">
        Kaden Boobsket
      </div>
      <div className="flex justify-center p-3 text-3xl bg-green-100 border-2 border-gray-300 rounded-xl">
        Justin Penisrez
      </div>
    </div>
  );
}
