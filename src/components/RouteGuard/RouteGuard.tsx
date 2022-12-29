import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { StoreState } from '@store/store';
// import { logoutUser } from '@store/slices/userSlice';
// import { logoutUser } from '@store/slices/userSlice';

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const user = useSelector((state: StoreState) => state.user.userInfo);
  // const dispatch = useDispatch<AppDispatch>();

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

    if (!user && !publicPaths.includes(path)) {
      setAuthorized(false);
      void router.push({
        pathname: '/login',
      });
    } else {
      setAuthorized(true);
    }

    // if (path === '/logout') {
    //   dispatch(logoutUser({}));

    //   void router.push({
    //     pathname: '/',
    //   });
    // }
    // TODO: change landing page after login
  }

  return authorized && children;
}
