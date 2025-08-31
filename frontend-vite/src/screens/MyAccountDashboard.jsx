import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * MyAccountDashboard
 * - Role-aware tiles for /my-account/*
 * - Loading / empty / error guards
 * - Defensive rendering when auth state is missing
 *
 * Routes expected to exist (render real screens with their own guards):
 *   /my-account/products | /blogs | /heroes | /badges | /settings | /uploads | /approvals
 *   /my-account/orders   | /profile | /wishlist
 */

const Tile = memo(({ to, title, desc }) => (
  <Link
    to={to}
    className="block rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2"
    aria-label={title}
  >
    <div className="font-semibold mb-1">{title}</div>
    {desc && <div className="text-sm text-gray-600">{desc}</div>}
  </Link>
));

const LoadingTile = () => (
  <div className="animate-pulse rounded-xl border bg-white p-5 shadow-sm">
    <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
    <div className="h-3 w-48 bg-gray-100 rounded" />
  </div>
);

const ErrorBanner = ({ message }) => (
  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
    {message || 'Something went wrong while loading your account information.'}
  </div>
);

const RoleBadge = ({ role }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-50">
    {role || 'guest'}
  </span>
);

const MyAccountDashboard = () => {
  const {
    userInfo = {},
    loading: authLoading = false,
    error: authError = null,
  } = useSelector((s) => s.auth || {});

  // Derive role defensively
  const role = useMemo(() => {
    const explicit = userInfo?.role || userInfo?.accountType;
    if (explicit) return explicit;
    if (userInfo?.isAdmin) return 'admin';
    return 'guest';
  }, [userInfo]);

  const adminTiles = useMemo(
    () => [
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
    ],
    []
  );

  const personalTiles = useMemo(
    () => [
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
    ],
    []
  );

  const tiles = role === 'admin' ? adminTiles : personalTiles;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Account</h1>
          <div className="text-gray-700">
            Signed in as{' '}
            <span className="font-medium">{userInfo?.email || '—'}</span> —{' '}
            role: <RoleBadge role={role} />
          </div>
        </div>
        <Link
          to="/my-account/profile"
          className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Edit Profile
        </Link>
      </div>

      {authLoading && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingTile key={i} />
          ))}
        </div>
      )}

      {!authLoading && authError && (
        <div className="mb-4">
          <ErrorBanner message={authError} />
        </div>
      )}

      {!authLoading && !authError && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.length > 0 ? (
            tiles.map((t) => <Tile key={t.to} {...t} />)
          ) : (
            <div className="col-span-full rounded-md border border-gray-200 bg-white p-6 text-sm text-gray-700">
              No tools are available for your account yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAccountDashboard;
