import React from 'react';
import { classicNameResolver } from 'typescript';
import './MyTeams.module.css';

export default function MyTeams() {
  return (
    <div className="grid grid-cols-1 gap-3 bg-gray-100 rounded-xl">
      <div className="flex justify-center p-6 text-6xl bg-black text-white rounded-t-xl">
        My Teams
      </div>
      <div className="flex justify-center p-3 text-3xl">this sucks</div>
      <div className="flex justify-center p-3 text-3xl ">Jakes gay team</div>
      <div className="flex justify-center p-3 text-3xl ">kadens gay team</div>
      <div className="flex justify-center p-3 text-3xl">my cool ass team</div>
    </div>
  );
}
