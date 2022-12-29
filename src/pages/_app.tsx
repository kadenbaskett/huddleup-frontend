import '@styles/globals.css';
import NavBar from '@components/NavBar/NavBar';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '@store/store';
// import RouteGuard from '@components/RouteGuard/RouteGuard';
import AppStateInit from '@components/AppStateInit/AppStateInit';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <NavBar />
      <AppStateInit>
        {/* <RouteGuard> */}
        <Component {...props.pageProps} />
        {/* </RouteGuard> */}
      </AppStateInit>
    </Provider>
  );
};

export default MyApp;
