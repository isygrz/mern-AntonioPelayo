import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProfile } from '@/redux/slices/authSlice';

/**
 * AuthBootstrap (merged, thunk-friendly)
 * - Uses your existing fetchProfile() thunk to rehydrate from cookie on first mount.
 * - Avoids duplicate hydrate calls with a local ref.
 * - After successful auth, redirects to /my-account/dashboard if you came from auth pages
 *   (/signin, /email-check, /check-email) or the legacy /account.
 * - Stays hands-off if you're already on another private page.
 */
export default function AuthBootstrap() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const hydratedRef = useRef(false);

  const { isAuthenticated, loading } = useSelector((s) => s.auth || {});

  // Rehydrate once on app load
  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  // Post-login redirect
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
