import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from '@/utils/axiosInstance';

const OfflineCtx = createContext(null);

export function useOffline() {
  const ctx = useContext(OfflineCtx);
  if (!ctx)
    throw new Error('useOffline must be used within <OfflineProvider />');
  return ctx;
}

export default function OfflineProvider({ children, pollMs = 30000 }) {
  const [online, setOnline] = useState(true);
  const [lastOk, setLastOk] = useState(null);
  const [usedSnapshot, setUsedSnapshot] = useState(false);

  useEffect(() => {
    let alive = true;
    const tick = async () => {
      try {
        const { data } = await axios.get('/cms/health');
        const ok = !!(data && (data.ok === true || data.status === 'ok'));
        if (!alive) return;
        setOnline(ok);
        if (ok) setLastOk(Date.now());
      } catch {
        if (!alive) return;
        setOnline(false);
      }
    };
    tick();
    const id = setInterval(tick, pollMs);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [pollMs]);

  const value = useMemo(
    () => ({
      online,
      lastOk,
      usedSnapshot,
      markSnapshotUsed: () => setUsedSnapshot(true),
      clearSnapshotUse: () => setUsedSnapshot(false),
    }),
    [online, lastOk, usedSnapshot]
  );

  return <OfflineCtx.Provider value={value}>{children}</OfflineCtx.Provider>;
}
