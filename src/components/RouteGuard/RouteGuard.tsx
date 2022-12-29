import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const user = useSelector((state: StoreState) => state.user.userInfo);

  useEffect(() => {
    // on initial load - run auth check
    void authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [user]);

  async function authCheck(url) {
    const path = url.split('?')[0];
    const publicPaths = ['/login', '/', '/signup']; // pages that logged out users are able to access

    // Route a logged in user away from login or signup pages
    if (user && publicPaths.includes(path)) {
      void router.replace({
        pathname: '/home',
      });

      setAuthorized(true);
    }
    // Don't let a logged out user access private pages
    else if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      void router.replace({
        pathname: '/login',
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
