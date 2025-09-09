import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NotFoundScreen() {
  const { pathname } = useLocation();
  return (
    <div className="max-w-3xl mx-auto py-16 text-center">
      <h1 className="text-4xl font-extrabold mb-3">404 — Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        We couldn't find{' '}
        <code className="px-1 bg-gray-100 rounded">{pathname}</code>. If you
        followed a link, it may be out of date or you don’t have access.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link to="/" className="px-4 py-2 rounded bg-black text-white">
          Go Home
        </Link>
        <Link to="/search" className="px-4 py-2 rounded border">
          Search Products
        </Link>
      </div>
    </div>
  );
}
