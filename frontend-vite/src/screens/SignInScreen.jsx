import React from 'react';
import { Link } from 'react-router-dom';

const SignInScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Deprecated Screen</h2>
        <p className="text-sm text-gray-500">
          Please use the new{' '}
          <Link to="/check-email" className="text-blue-600 hover:underline">
            Email Check Flow
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignInScreen;
