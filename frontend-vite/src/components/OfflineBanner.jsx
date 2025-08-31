import React from 'react';
import { useOffline } from '@/offline/OfflineProvider';

export default function OfflineBanner() {
  const { online, usedSnapshot } = useOffline();
  if (online && !usedSnapshot) return null;
  return (
    <div className="w-full bg-amber-500 text-black text-sm py-1 px-3 flex items-center justify-center gap-3">
      <span>
        {online
          ? 'Showing cached content (recently offline).'
          : 'You are offline – showing cached content.'}
      </span>
      <button
        className="underline"
        onClick={() => (window.location.href = window.location.href)}
      >
        Refresh
      </button>
    </div>
  );
}
