import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorBoundary from '@/components/ErrorBoundary';

const Section = ({ children }) => (
  <div className="text-xs uppercase tracking-wide text-gray-500 mt-6 mb-2">
    {children}
  </div>
);

const Item = ({ to, active, children }) => (
  <Link
    to={to}
    className={
      'block px-3 py-2 rounded ' +
      (active ? 'bg-black text-white' : 'hover:bg-gray-100')
    }
  >
    {children}
  </Link>
);

const normalizeRole = (user) =>
  user?.role || (user?.isAdmin ? 'admin' : user?.accountType || 'guest');

const AccountLayout = () => {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const role = normalizeRole(userInfo);

  const isActive = (segment) =>
    location.pathname.includes(`/my-account/${segment}`);

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10">
      <aside className="w-full md:w-64 p-4 bg-gray-100 rounded mb-4 md:mb-0 md:mr-6">
        <div className="font-semibold mb-3">{userInfo?.email}</div>

        <Section>My Account</Section>
        <nav className="space-y-1">
          <Item to="/my-account/dashboard" active={isActive('dashboard')}>
            Dashboard
          </Item>
          <Item to="/my-account/orders" active={isActive('orders')}>
            My Orders
          </Item>
          <Item to="/my-account/wishlist" active={isActive('wishlist')}>
            Wishlist
          </Item>
          <Item to="/my-account/profile" active={isActive('profile')}>
            Profile
          </Item>
        </nav>

        {(role === 'admin' || role === 'vendor') && (
          <>
            <Section>Vendor Tools</Section>
            <nav className="space-y-1">
              <Item to="/my-account/inventory" active={isActive('inventory')}>
                Inventory
              </Item>
              <Item
                to="/my-account/mobile-tools"
                active={isActive('mobile-tools')}
              >
                Mobile Tools
              </Item>
            </nav>
          </>
        )}

        {role === 'admin' && (
          <>
            <Section>Admin — My Account</Section>
            <nav className="space-y-1">
              <Item to="/my-account/approvals" active={isActive('approvals')}>
                User Approvals
              </Item>
              <Item to="/my-account/cms" active={isActive('cms')}>
                CMS Editor
              </Item>
              <Item
                to="/my-account/settings/footer"
                active={isActive('settings/footer')}
              >
                Footer Links
              </Item>
              <Item to="/my-account/debug" active={isActive('debug')}>
                Debug Panel
              </Item>
            </nav>

            <Section>Admin — Site Console</Section>
            <nav className="space-y-1">
              <Item to="/my-account/products" active={isActive('products')}>
                Products
              </Item>
              <Item to="/my-account/blogs" active={isActive('blogs')}>
                Blogs
              </Item>
              <Item to="/my-account/heroes" active={isActive('heroes')}>
                Heroes
              </Item>
              <Item to="/my-account/badges" active={isActive('badges')}>
                Badges
              </Item>
              <Item to="/my-account/settings" active={isActive('settings')}>
                Settings
              </Item>
              <Item to="/my-account/uploads" active={isActive('uploads')}>
                Uploads
              </Item>
            </nav>
          </>
        )}
      </aside>

      <main className="flex-1 p-4 bg-white rounded shadow">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
};

export default AccountLayout;
