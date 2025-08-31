import axios from '@/utils/axiosInstance';
import { runWithSnapshot, writeSnapshot } from '@/offline/snapshot';

const KEY = 'footer';

export async function fetchFooter() {
  const res = await runWithSnapshot(
    KEY,
    () => axios.get('/cms/footer').then((r) => r.data),
    { axios, healthUrl: '/cms/health' }
  );
  return res.data || { links: [], updatedAt: null };
}

export async function updateFooterLinks(links) {
  const { data } = await axios.put('/cms/footer', { links });
  writeSnapshot(KEY, data);
  return data;
}
