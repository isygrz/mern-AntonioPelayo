const NS = 'offline.snapshot.v1';
const now = () => Date.now();
const k = (key) => `${NS}:${key}`;

export function readSnapshot(key) {
  try {
    const raw = localStorage.getItem(k(key));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function writeSnapshot(key, data, meta = {}) {
  try {
    const payload = { ts: now(), data, ...meta };
    localStorage.setItem(k(key), JSON.stringify(payload));
    return payload;
  } catch {
    return null;
  }
}

export function clearSnapshot(key) {
  try {
    localStorage.removeItem(k(key));
  } catch {}
}

async function pingHealth(axiosInstance, healthUrl) {
  if (!axiosInstance || !healthUrl) return { online: null };
  try {
    const { data } = await axiosInstance.get(healthUrl);
    const ok = !!(data && (data.ok === true || data.status === 'ok'));
    return { online: ok };
  } catch {
    return { online: false };
  }
}

/**
 * runWithSnapshot
 * @param {string} key
 * @param {() => Promise<any>} runner
 * @param {{ttlMs?:number, axios?:any, healthUrl?:string, validate?:(data:any)=>boolean}} opts
 */
export async function runWithSnapshot(key, runner, opts = {}) {
  const ttlMs =
    typeof opts.ttlMs === 'number' ? opts.ttlMs : 7 * 24 * 60 * 60 * 1000;
  const validate =
    typeof opts.validate === 'function' ? opts.validate : () => true;
  const prior = readSnapshot(key);
  const health = await pingHealth(opts.axios, opts.healthUrl);
  let online = health.online;

  try {
    const fresh = await runner();
    if (validate(fresh)) {
      const saved = writeSnapshot(key, fresh);
      return {
        data: fresh,
        source: 'network',
        online: online ?? true,
        ts: saved?.ts || now(),
        stale: false,
      };
    }
  } catch {}

  if (prior && now() - prior.ts <= ttlMs) {
    return {
      data: prior.data,
      source: 'snapshot',
      online: online ?? false,
      ts: prior.ts,
      stale: true,
    };
  }
  return { data: null, source: 'empty', online: online ?? false, stale: true };
}
