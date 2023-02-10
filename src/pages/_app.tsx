import '@styles/globals.css';
import NavBar from '@components/NavBar/NavBar';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { wrapper } from '@store/store';
import AppStateInit from '@components/AppStateInit/AppStateInit';
import Authorization from '@components/Authorization/Authorization';
import RouteGuard from '@components/RouteGuard/RouteGuard';
import Footer from '@components/Footer/Footer';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Authorization>
        <NavBar />
        <AppStateInit>
          <RouteGuard>
            <div id='page-container'>
              <div id='content-wrap'>
                <Component {...props.pageProps} />
              </div>
              <Footer />
            </div>
          </RouteGuard>
        </AppStateInit>
      </Authorization>
    </Provider>
  );
};

export default MyApp;
