// - Single, safe rehydrate attempt on first mount
// - Uses your existing fetchProfile() thunk
// - Treats 401 as a normal 'guest' state (no errors / no redirects)
// - Optional post-login redirect only if we *came from* an auth page
// - No-op if already authenticated or still loading

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProfile } from '@/redux/slices/authSlice';

export default function AuthBootstrap() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // guard so we only attempt rehydrate once per app load
  const triedRef = useRef(false);

  const { isAuthenticated, loading } = useSelector((s) => s.auth || {});

  // Bootstrap auth from cookie/session (once)
  useEffect(() => {
    if (triedRef.current) return;
    triedRef.current = true;

    // dispatch returns a promise (RTK thunk). We intentionally ignore 401.
    // This keeps the app in a clean 'guest' state without surfacing an error.
    const p = dispatch(fetchProfile());
    if (p && typeof p.catch === 'function') {
      p.catch((err) => {
        // Acceptable 'guest' outcomes
        const status = err?.status ?? err?.response?.status;
        if (status === 401) return; // unauthenticated = guest
        // Network/timeouts are handled by axios/offline provider; avoid noise here.
        // eslint-disable-next-line no-console
        console.debug(
          '[AuthBootstrap] non-401 fetchProfile error (ignored):',
          err
        );
      });
    }
  }, [dispatch]);

  // Post-login redirect (only if we *landed from* an auth route)
  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) return;

    const cameFromAuth =
      pathname === '/account' ||
      pathname.startsWith('/signin') ||
      pathname.startsWith('/email-check') ||
      pathname.startsWith('/check-email');

    if (cameFromAuth) {
      navigate('/my-account/dashboard', { replace: true });
    }
  }, [isAuthenticated, loading, pathname, navigate]);

  return null;
}
