import React from 'react';
import SockJS from 'sockjs-client';

export default function index() {
  const sock = new SockJS('http://localhost:9999/echo');

  sock.onopen = function () {
    console.log('open');

    const send = {
      message: 'my message',
      username: 'my username',
    };

    sendMessage(send);
  };

  sock.onclose = function () {
    console.log('close');
  };

  sock.onmessage = function (e) {
    const content = JSON.parse(e.data);
    console.log(content);
  };

  function sendMessage(message) {
    sock.send(JSON.stringify(message));
  }

  return <div>index</div>;
}
