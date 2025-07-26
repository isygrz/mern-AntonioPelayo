import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { generateSecureId } from '@/utils/generateSecureId';

const MobileSessionLauncher = () => {
  const [sessionToken, setSessionToken] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [extended, setExtended] = useState(false);

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

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">
        📱 Launch Mobile Scanning Session
      </h2>

      {!sessionToken ? (
        <button
          onClick={startSession}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Generate Mobile Session
        </button>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600">
            Scan this QR code with your phone to open the mobile inventory tool.
          </p>

          <div className="bg-white p-2 inline-block rounded">
            <QRCode
              value={`https://yourdomain.com/mobile-session/${sessionToken}`}
              size={200}
              style={{ height: 'auto', maxWidth: '100%', width: '200px' }}
            />
          </div>

          <p className="text-sm text-gray-500">
            ⏳ Expires: {new Date(expiresAt).toLocaleTimeString()}{' '}
            {extended && <em>(extended)</em>}
          </p>

          <button
            onClick={extendSession}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
          >
            I'm still working (extend 15 min)
          </button>

          <button
            onClick={() => {
              setSessionToken(null);
              setExpiresAt(null);
              setExtended(false);
            }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
          >
            End Session
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileSessionLauncher;
