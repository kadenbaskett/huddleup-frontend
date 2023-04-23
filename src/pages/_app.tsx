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
        <div id='page-container' className='w-full'>
          <div id='content-wrap'>
            <NavBar />
            <AppStateInit>
              <RouteGuard>
                <Component {...props.pageProps} />
                <Footer />
              </RouteGuard>
            </AppStateInit>
          </div>
        </div>
      </Authorization>
    </Provider>
  );
};

export default MyApp;
