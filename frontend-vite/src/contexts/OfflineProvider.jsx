// Namespaced + hardened provider:
// - Listens ONLY to 'offline:footer-used' and 'offline:footer-clear'
// - Banner renders only after a 'used' event in THIS page load (armed gate)
// - Auto-clears after 2s to avoid stale banners under HMR

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const OfflineCtx = createContext({
  usingSnapshot: false,
  setUsingSnapshot: () => {},
});
export const useOffline = () => useContext(OfflineCtx);

export default function OfflineProvider({ children }) {
  const [usingSnapshot, setUsingSnapshot] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    // Fail-safe: hide banner if nothing toggles within 2s after mount.
    const timer = setTimeout(() => setUsingSnapshot(false), 2000);

    const onUsed = () => {
      setArmed(true);
      setUsingSnapshot(true);
    };
    const onClear = () => setUsingSnapshot(false);
    const onOnline = () => setUsingSnapshot(false);

    window.addEventListener('offline:footer-used', onUsed);
    window.addEventListener('offline:footer-clear', onClear);
    window.addEventListener('online', onOnline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('offline:footer-used', onUsed);
      window.removeEventListener('offline:footer-clear', onClear);
      window.removeEventListener('online', onOnline);
    };
  }, []);

  const value = useMemo(
    () => ({ usingSnapshot, setUsingSnapshot }),
    [usingSnapshot]
  );

  return (
    <OfflineCtx.Provider value={value}>
      {armed && usingSnapshot && (
        <div
          data-test="offline-banner"
          className="text-sm w-full text-gray-700 bg-blue-50 border-b border-blue-100 py-2 px-3"
        >
          You're offline — showing last saved data.
        </div>
      )}
      {children}
    </OfflineCtx.Provider>
  );
}
