import { useEffect, useMemo, useState } from 'react';
import axios from '@/utils/axiosInstance';
import { runWithSnapshot } from '@/offline/snapshot';
import { useOffline } from '@/offline/OfflineProvider';

const KEY = 'footer';

/**
 * useFooter (refined)
 * - Treats 404 from /cms/footer as "no content yet" instead of hard error
 * - Returns { loading, error, data, source, stale, ts, online, refresh }
 */
export default function useFooter() {
  const { online, markSnapshotUsed } = (() => {
    try {
      return useOffline();
    } catch {
      return { online: null, markSnapshotUsed: () => {} };
    }
  })();

  const [state, setState] = useState({
    loading: true,
    error: null,
    data: { links: [], updatedAt: null },
    source: 'empty',
    stale: false,
    ts: null,
  });

  const fetchOnce = async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await runWithSnapshot(
        KEY,
        async () => {
          try {
            const { data } = await axios.get('/cms/footer');
            return data;
          } catch (err) {
            if (err?.response?.status === 404) {
              // API not implemented yet: treat as empty
              return { links: [], updatedAt: null };
            }
            throw err;
          }
        },
        { axios, healthUrl: '/cms/health' }
      );
      if (res.source === 'snapshot') markSnapshotUsed();
      setState({
        loading: false,
        error: null,
        data: res.data || { links: [], updatedAt: null },
        source: res.source,
        stale: !!res.stale || res.source === 'snapshot',
        ts: res.ts || null,
      });
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
        error: err,
      }));
    }
  };

  useEffect(() => {
    fetchOnce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = async () => {
    await fetchOnce();
  };

  return useMemo(
    () => ({
      ...state,
      online,
      refresh,
    }),
    [state, online]
  );
}
