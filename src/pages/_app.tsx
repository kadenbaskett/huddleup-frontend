import '@styles/globals.css';
import NavBar from '@components/NavBar/NavBar';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '@store/store';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <div>
        <NavBar />
        <Component {...props.pageProps} />
      </div>
    </Provider>
  );
};

export default MyApp;
