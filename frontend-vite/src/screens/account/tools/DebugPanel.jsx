import React from 'react';
import { useSelector } from 'react-redux';

const DebugPanel = () => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const products = useSelector((state) => state.products);
  const cms = useSelector((state) => state.cms);

  const logState = () => {
    console.log(
      '%c🧠 Redux State Snapshot:',
      'color: cyan; font-weight: bold;'
    );
    console.log({ auth, users, products, cms });
  };

  const checkAuthStatus = () => {
    console.log('%c🔐 Auth Check:', 'color: lime; font-weight: bold;');
    console.log({
      isAuthenticated: !!auth.userInfo,
      isAdmin: auth.userInfo?.isAdmin,
      accountType: auth.userInfo?.accountType,
      approved: auth.userInfo?.approved,
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">🛠 Developer Debug Panel</h2>
      <p className="text-gray-600 mb-4">
        Use these tools to inspect Redux state and auth session.
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={logState}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Log Redux State
        </button>

        <button
          onClick={checkAuthStatus}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Run Auth Status Check
        </button>
      </div>
    </div>
  );
};

export default DebugPanel;
