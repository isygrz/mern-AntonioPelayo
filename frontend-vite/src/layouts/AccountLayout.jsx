import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountLayout = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);

  const navItems = [];

  if (userInfo?.accountType === 'normal') {
    navItems.push({ label: 'My Orders', path: 'orders' });
    navItems.push({ label: 'Wishlist', path: 'wishlist' });
  }

  if (userInfo?.accountType === 'vendor') {
    navItems.push({ label: 'Inventory', path: 'inventory' });
    navItems.push({ label: 'Mobile Tools', path: 'mobile-tools' });
  }

  if (userInfo?.isAdmin) {
    navItems.push({ label: 'User Approvals', path: 'approvals' });
    navItems.push({ label: 'CMS Editor', path: 'cms' });
    navItems.push({ label: 'Debug Panel', path: 'debug' });
  }

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10">
      <aside className="w-full md:w-64 p-4 bg-gray-100 rounded mb-4 md:mb-0 md:mr-6">
        <h2 className="text-xl font-bold mb-4">Account Tools</h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-3 py-2 rounded hover:bg-gray-200 ${
                  location.pathname.includes(item.path)
                    ? 'bg-gray-300 font-medium'
                    : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 bg-white rounded shadow">
        <Outlet />
      </main>
    </div>
  );
};

export default AccountLayout;
