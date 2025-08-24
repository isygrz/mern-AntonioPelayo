import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Tile = memo(({ to, title, desc }) => (
  <Link
    to={to}
    className="block rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
  >
    <div className="font-semibold mb-1">{title}</div>
    {desc && <div className="text-sm text-gray-600">{desc}</div>}
  </Link>
));

const MyAccountDashboard = () => {
  const { userInfo = {} } = useSelector((s) => s.auth || {});
  const role =
    userInfo?.role ||
    (userInfo?.isAdmin ? 'admin' : userInfo?.accountType || 'guest');

  const adminTiles = [
    {
      to: '/my-account/products',
      title: 'Product Manager',
      desc: 'Add/update products, media and pricing',
    },
    {
      to: '/my-account/blogs',
      title: 'Blog Manager',
      desc: 'Create and edit blog posts',
    },
    {
      to: '/my-account/heroes',
      title: 'Hero Manager',
      desc: 'Homepage hero banners',
    },
    {
      to: '/my-account/badges',
      title: 'Badge Manager',
      desc: 'Homepage badges',
    },
    {
      to: '/my-account/settings',
      title: 'Settings',
      desc: 'Site configuration',
    },
    {
      to: '/my-account/uploads',
      title: 'Uploads',
      desc: 'Manage media library',
    },
    {
      to: '/my-account/approvals',
      title: 'User Approvals',
      desc: 'Review & approve vendor accounts',
    },
  ];

  const personalTiles = [
    {
      to: '/my-account/orders',
      title: 'Orders',
      desc: 'Review past orders and status',
    },
    {
      to: '/my-account/profile',
      title: 'Profile',
      desc: 'Update your details',
    },
    { to: '/my-account/wishlist', title: 'Wishlist', desc: 'Saved items' },
  ];

  const tiles = role === 'admin' ? adminTiles : personalTiles;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Account</h1>
          <div className="text-gray-700">
            Signed in as{' '}
            <span className="font-medium">{userInfo?.email || '—'}</span> —
            role: <span className="font-medium">{role}</span>
          </div>
        </div>
        <Link
          to="/my-account/profile"
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Edit Profile
        </Link>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Tile key={t.to} {...t} />
        ))}
      </div>
    </div>
  );
};

export default MyAccountDashboard;
