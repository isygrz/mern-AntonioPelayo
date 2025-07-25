import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorizedScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg mb-6">
        You do not have permission to view this page. If you believe this is an
        error, please contact an administrator.
      </p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotAuthorizedScreen;
