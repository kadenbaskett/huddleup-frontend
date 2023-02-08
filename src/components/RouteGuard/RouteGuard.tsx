import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const user = useSelector((state: StoreState) => state.user.userInfo);
  const firebaseStatus = useSelector((state: StoreState) => state.user.firebaseStatus);

  useEffect(() => {
    // on initial load - run auth check
    void authCheck(router.asPath);

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [user, firebaseStatus]);

  async function authCheck(url) {
    const path = url.split('?')[0];
    const publicPaths = ['/login', '/', '/signup', '/forgotpassword']; // pages that logged out users are able to access
    const loginPages = ['/login', '/signup', '/forgotpassword'];

    if (firebaseStatus === 'idle') {
      setAuthorized(false);
    } else {
      // Route a logged in user away from login or signup pages
      if (user && loginPages.includes(path)) {
        setAuthorized(true);
        void router.replace({
          pathname: '/home',
        });
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
  }

  return authorized && children;
}
