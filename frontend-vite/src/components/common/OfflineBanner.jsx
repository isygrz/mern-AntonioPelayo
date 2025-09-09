// Simple banner component that follows the provider state.
import React from 'react';
import { useOffline } from '@/contexts/OfflineProvider';

export default function OfflineBanner() {
  const { usingSnapshot } = useOffline();
  if (!usingSnapshot) return null;
  return (
    <div
      data-test="offline-banner"
      className="text-sm w-full text-gray-700 bg-blue-50 border-b border-blue-100 py-2 px-3"
    >
      You're offline — showing last saved data.
    </div>
  );
}
