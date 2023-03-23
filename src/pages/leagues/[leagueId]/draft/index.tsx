import React from 'react';
import SockJS from 'sockjs-client';

export default function index() {
  const sock = new SockJS('http://localhost:7071');

  sock.onopen = function () {
    console.log('open');
    sock.send('test');
  };

  sock.onmessage = function (e) {
    console.log('message', e.data);
    sock.close();
  };

  sock.onclose = function () {
    console.log('close');
  };

  return <div>index</div>;
}
