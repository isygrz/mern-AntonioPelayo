// Emits ONLY namespaced offline events that OfflineProvider listens to.
// - Ignores canceled requests (StrictMode) and retries once after 150ms.
// - Emits 'offline:footer-used' ONLY when it actually renders a snapshot due to a real network failure.
// - Emits 'offline:footer-clear' on any successful refresh.

import { useEffect, useRef, useState } from 'react';
import axios from '@/utils/axiosInstance';
import axiosLib from 'axios';
import { isInternal, sanitizeUrl } from '@/utils/url';

const SNAPSHOT_KEY = 'snapshot:footer:v1';

function normalizeLinks(links) {
  if (!Array.isArray(links)) return [];
  return links
    .map((l, idx) => {
      const name = l?.name ?? l?.label ?? l?.title ?? `Link ${idx + 1}`;
      const rawUrl = l?.url ?? l?.href ?? l?.path ?? '';
      const url = sanitizeUrl(rawUrl);
      const external = url ? !isInternal(url) : false;
      return {
        name,
        url,
        external,
        enabled: l?.enabled !== false && Boolean(url),
        order: Number.isFinite(l?.order) ? l.order : idx,
      };
    })
    .filter((l) => l.enabled)
    .sort((a, b) => a.order - b.order);
}

function readSnapshot() {
  try {
    return JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || 'null');
  } catch {
    return null;
  }
}
function writeSnapshot(payload) {
  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(payload));
  } catch {}
}
function emit(name) {
  try {
    window.dispatchEvent(new Event(name));
  } catch {}
}

export function useFooter() {
  const [links, setLinks] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [usingSnapshot, setUsingSnapshot] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasHydratedRef = useRef(false);
  const didRetryRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    if (!hasHydratedRef.current) {
      const snap = readSnapshot();
      if (snap?.links?.length) {
        const norm = normalizeLinks(snap.links);
        setLinks(norm);
        setUpdatedAt(snap.updatedAt || null);
        setLoading(false);
      }
      hasHydratedRef.current = true;
    }

    async function fetchOnce() {
      return axios.get('/footer', {
        validateStatus: () => true,
        signal: controller.signal,
      });
    }

    async function revalidate() {
      setError(null);
      try {
        const res = await fetchOnce();

        if (res.status >= 200 && res.status < 300 && res.data) {
          const norm = normalizeLinks(res.data.links || res.data);
          if (!cancelled) {
            setLinks(norm);
            setUpdatedAt(res.data.updatedAt || null);
            setUsingSnapshot(false);
            setLoading(false);
          }
          writeSnapshot({
            links: norm,
            updatedAt: res.data.updatedAt || new Date().toISOString(),
          });
          emit('offline:footer-clear');
          return;
        }

        // Non-2xx: try snapshot silently
        const snap = readSnapshot();
        if (snap?.links?.length) {
          const norm = normalizeLinks(snap.links);
          if (!cancelled) {
            setLinks(norm);
            setUpdatedAt(snap.updatedAt || null);
            setUsingSnapshot(true);
            setLoading(false);
            setError(`Footer unavailable (status ${res.status})`);
          }
          return;
        }

        if (!cancelled) {
          setLinks([]);
          setUsingSnapshot(false);
          setLoading(false);
          setError('Footer not available');
        }
      } catch (err) {
        if (cancelled) return;

        const code = err?.code;
        const hasResponse = !!err?.response;
        const isCanceled =
          code === 'ERR_CANCELED' ||
          (typeof axiosLib.isCancel === 'function' && axiosLib.isCancel(err));

        // Ignore canceled requests and retry once
        if (isCanceled) {
          if (!didRetryRef.current) {
            didRetryRef.current = true;
            setTimeout(() => !cancelled && revalidate(), 150);
          }
          return;
        }

        const isNetworkFailure =
          !hasResponse || code === 'ERR_NETWORK' || err?.response?.status === 0;

        // Only if we actually render snapshot due to a network failure do we show the banner
        const snap = readSnapshot();
        if (snap?.links?.length) {
          const norm = normalizeLinks(snap.links);
          setLinks(norm);
          setUpdatedAt(snap.updatedAt || null);
          setUsingSnapshot(true);
          setLoading(false);
          setError('Offline — showing last saved footer');
          if (isNetworkFailure) emit('offline:footer-used');
          return;
        }

        setLinks([]);
        setUsingSnapshot(true);
        setLoading(false);
        setError('Offline — no saved footer');
        if (isNetworkFailure) emit('offline:footer-used');
      }
    }

    revalidate();
    return () => {
      cancelled = true;
      try {
        controller.abort();
      } catch {}
    };
  }, []);

  return { links, updatedAt, usingSnapshot, loading, error };
}
