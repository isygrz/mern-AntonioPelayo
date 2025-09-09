export type SnapshotResult<T> = {
  data: T | null;
  updatedAt?: string | null;
};

export function readSnapshot<T = unknown>(key: string): SnapshotResult<T> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { data: null, updatedAt: null };
    const parsed = JSON.parse(raw);
    return { data: parsed.data as T, updatedAt: parsed.updatedAt || null };
  } catch {
    return { data: null, updatedAt: null };
  }
}

export function writeSnapshot<T = unknown>(key: string, data: T) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ data, updatedAt: new Date().toISOString() })
    );
  } catch {}
}
