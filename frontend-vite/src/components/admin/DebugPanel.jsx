import React, { useState } from 'react';

const probes = [
  { key: 'api', path: '/api/health', label: 'API' },
  { key: 'db', path: '/api/health/db', label: 'DB' },
  { key: 'cms', path: '/api/cms/health', label: 'CMS' },
  { key: 'products', path: '/api/products/health', label: 'Products' },
];

export default function DebugPanel() {
  const [state, setState] = useState({});
  const [counts, setCounts] = useState({
    products: null,
    blogs: null,
    cms: null,
  });

  const run = async (p) => {
    const start = Date.now();
    try {
      const res = await fetch(p.path);
      const json = await res.json();
      setState((s) => ({
        ...s,
        [p.key]: {
          ok: res.ok && json.status !== 'down',
          at: new Date().toISOString(),
          ms: Date.now() - start,
        },
      }));
    } catch (e) {
      setState((s) => ({
        ...s,
        [p.key]: {
          ok: false,
          at: new Date().toISOString(),
          ms: Date.now() - start,
        },
      }));
    }
  };

  const runAll = async () => {
    for (const p of probes) await run(p);
    // Optionally request counts from your existing endpoints
    try {
      const [pRes, bRes, cRes] = await Promise.all([
        fetch('/api/products?limit=1'),
        fetch('/api/blogs?limit=1'),
        fetch('/api/cms?route=/'),
      ]);
      setCounts({
        products: pRes.ok ? 'ok' : 'n/a',
        blogs: bRes.ok ? 'ok' : 'n/a',
        cms: cRes.ok ? 'ok' : 'n/a',
      });
    } catch {}
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Debug Panel</h2>
      <div className="flex gap-2">
        <button
          className="px-3 py-2 rounded bg-black text-white"
          onClick={runAll}
        >
          Run All
        </button>
        {probes.map((p) => (
          <button
            key={p.key}
            className="px-3 py-2 rounded bg-gray-100"
            onClick={() => run(p)}
          >
            Check {p.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {probes.map((p) => {
          const s = state[p.key];
          const ok = s?.ok;
          return (
            <div
              key={p.key}
              className={`rounded border p-3 ${
                ok === undefined
                  ? 'border-gray-200'
                  : ok
                  ? 'border-green-300 bg-green-50'
                  : 'border-red-300 bg-red-50'
              }`}
            >
              <div className="text-sm font-medium">{p.label}</div>
              <div className="text-xs opacity-70">
                {s?.at ? new Date(s.at).toLocaleTimeString() : '—'}
              </div>
              <div className="text-xs">{s?.ms ? `${s.ms} ms` : ''}</div>
            </div>
          );
        })}
      </div>
      <div className="text-sm">
        <div>
          Counts (basic sanity): products: {String(counts.products)}, blogs:{' '}
          {String(counts.blogs)}, cms: {String(counts.cms)}
        </div>
      </div>
    </div>
  );
}
