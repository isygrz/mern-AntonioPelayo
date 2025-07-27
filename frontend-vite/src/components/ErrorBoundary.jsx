import React from 'react';

const ErrorBoundary = ({ children }) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
  );
};

export default ErrorBoundary;
