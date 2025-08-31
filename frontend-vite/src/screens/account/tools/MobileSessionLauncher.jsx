import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'react-qr-code';
import { generateSecureId } from '@/utils/generateSecureId';

/**
 * MobileSessionLauncher (lint-fix)
 * - Uses Vite client env only (no process.env)
 * - Catch blocks without unused identifiers (avoids no-unused-vars)
 * - Comments in catches avoid no-empty
 */

const stripTrailingSlash = (s = '') => s.replace(/\/$/, '');

const getSafeBaseUrl = () => {
  // 1) Vite-style client env
  let envUrl;
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      envUrl =
        import.meta.env.VITE_MOBILE_BASE_URL ||
        import.meta.env.VITE_FRONTEND_ORIGIN ||
        undefined;
    }
  } catch {
    /* ignore: env access not available */
  }

  // 2) Browser origin for dev/preview
  const originUrl =
    typeof window !== 'undefined' ? window.location.origin : undefined;

  // Choose the first available
  const candidate = envUrl || originUrl || 'http://localhost:5173';

  try {
    const u = new URL(candidate);
    if (!/^https?:$/.test(u.protocol)) throw new Error('Invalid protocol');
    return stripTrailingSlash(u.toString());
  } catch {
    // Final safe fallback
    try {
      const o =
        typeof window !== 'undefined'
          ? new URL(window.location.origin)
          : new URL('http://localhost:5173');
      return stripTrailingSlash(o.toString());
    } catch {
      /* ignore */
      return 'http://localhost:5173';
    }
  }
};

const MobileSessionLauncher = () => {
  const [sessionToken, setSessionToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [extended, setExtended] = useState(false);

  // Resolve base URL on the client to avoid SSR hydration mismatches
  const [baseUrl, setBaseUrl] = useState('');
  useEffect(() => {
    setBaseUrl(getSafeBaseUrl());
  }, []);

  const sessionUrl = useMemo(() => {
    if (!sessionToken || !baseUrl) return '';
    return `${baseUrl}/mobile-session/${sessionToken}`;
  }, [baseUrl, sessionToken]);

  const startSession = () => {
    const token = generateSecureId();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    setSessionToken(token);
    setExpiresAt(expiry.toISOString());
    setExtended(false);
  };

  const extendSession = () => {
    const newExpiry = new Date(Date.now() + 15 * 60 * 1000);
    setExpiresAt(newExpiry.toISOString());
    setExtended(true);
  };

  const endSession = () => {
    setSessionToken(null);
    setExpiresAt(null);
    setExtended(false);
  };

  const copyToClipboard = async () => {
    try {
      if (!sessionUrl) return;
      await navigator.clipboard.writeText(sessionUrl);
      alert('Session link copied to clipboard.');
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">
        📱 Launch Mobile Scanning Session
      </h2>

      {!sessionToken ? (
        <div className="space-y-3">
          <button
            onClick={startSession}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Generate Mobile Session
          </button>
          <p className="text-xs text-gray-500">
            QR base URL:&nbsp;
            <code>{baseUrl || 'resolving…'}</code>
          </p>
          <p className="text-xs text-gray-500">
            Tip: set <code>VITE_MOBILE_BASE_URL</code> (Vite env) for demos.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">
            Scan this QR code with your phone to open the mobile inventory tool.
          </p>

          <div className="bg-white p-2 inline-block rounded border">
            <QRCode
              value={sessionUrl || 'about:blank'}
              size={200}
              style={{ height: 'auto', maxWidth: '100%', width: '200px' }}
            />
          </div>

          {sessionUrl && (
            <div className="space-y-2">
              <div className="text-sm break-all">
                <span className="font-medium">Session URL:</span>{' '}
                <a
                  href={sessionUrl}
                  className="text-indigo-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {sessionUrl}
                </a>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="bg-slate-200 hover:bg-slate-300 text-gray-700 px-3 py-1 rounded"
                >
                  Copy link
                </button>
                <button
                  onClick={() => window.open(sessionUrl, '_blank', 'noopener')}
                  className="bg-slate-200 hover:bg-slate-300 text-gray-700 px-3 py-1 rounded"
                >
                  Open
                </button>
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500">
            ⏳ Expires: {new Date(expiresAt).toLocaleTimeString()}{' '}
            {extended && <em>(extended)</em>}
          </p>

          <div className="flex gap-2">
            <button
              onClick={extendSession}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
            >
              I'm still working (extend 15 min)
            </button>

            <button
              onClick={endSession}
              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
            >
              End Session
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSessionLauncher;
