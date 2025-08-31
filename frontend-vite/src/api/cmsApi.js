import axios from '@/utils/axiosInstance';
import { runWithSnapshot } from '@/offline/snapshot';
import { useOffline } from '@/offline/OfflineProvider';

export async function getCMS(path, key, { validate } = {}) {
  const res = await runWithSnapshot(
    key,
    () => axios.get(path).then((r) => r.data),
    { axios, healthUrl: '/cms/health', validate }
  );
  try {
    const { markSnapshotUsed } = useOffline();
    if (res.source === 'snapshot' && typeof markSnapshotUsed === 'function') {
      markSnapshotUsed();
    }
  } catch {}
  return res;
}

export const getHomeContent = () => getCMS('/cms/home', 'cms:home');
export const getBlocks = () => getCMS('/cms/blocks', 'cms:blocks');
