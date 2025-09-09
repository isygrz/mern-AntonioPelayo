import { useEffect, useMemo, useState } from 'react';
import { readSnapshot, writeSnapshot } from './useOfflineSnapshot.ts';

const SNAPSHOT_KEY = 'snapshot:footer:v1';

export type FooterLink = {
  name: string;
  url: string;
  external?: boolean;
  enabled?: boolean;
  order?: number;
};

export function useFooter() {
  const [links, setLinks] = useState<FooterLink[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSnapshot, setIsSnapshot] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | undefined>();

  useEffect(() => {
    let canceled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/footer');
        if (!res.ok) throw new Error('bad');
        const json = await res.json();
        if (canceled) return;
        setLinks(json.links || []);
        setUpdatedAt(json.updatedAt);
        setIsSnapshot(false);
        writeSnapshot(SNAPSHOT_KEY, json);
      } catch (err) {
        const snap = readSnapshot<any>(SNAPSHOT_KEY);
        if (snap.data) {
          setLinks(snap.data.links || []);
          setUpdatedAt(snap.updatedAt || undefined);
          setIsSnapshot(true);
        } else {
          setLinks([]);
          setIsSnapshot(true);
        }
      } finally {
        if (!canceled) setLoading(false);
      }
    }

    load();
    // Optionally: return () => { canceled = true } to avoid late setState
    return () => {
      canceled = true;
    };
  }, []);

  const ordered = useMemo(
    () => (links || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [links]
  );

  return { links: ordered, loading, isSnapshot, updatedAt };
}
