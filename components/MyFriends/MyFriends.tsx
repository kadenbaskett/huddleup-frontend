import React, { ReactNode } from 'react';
import './MyFriends.module.css';

type HeaderProps = {
  names: ReactNode;
};

export default function MyFriends() {
  return <div className="grid grid-cols-1 bg-white rounded-xl"></div>;
}
