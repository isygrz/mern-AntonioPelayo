import React from 'react';
import { useSelector } from 'react-redux';

const AccountScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">My Account</h1>

      <div className="bg-white shadow rounded p-6">
        <p>
          <strong>Name:</strong> {userInfo?.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo?.email}
        </p>
        <p>
          <strong>Account Type:</strong> {userInfo?.accountType}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          {userInfo?.approved ? 'Approved' : 'Pending Approval'}
        </p>
      </div>

      {/* Placeholder: Replace this with role-based nested panel UI */}
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="text-blue-700">
          This is your future role-based control panel. Tools will appear here
          based on your permissions.
        </p>
      </div>
    </div>
  );
};

export default AccountScreen;
