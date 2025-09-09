// Small floating badge that shows Guest vs Signed-in state.
// Safe to drop anywhere (App.jsx is a good place).
// - When not authenticated: "Guest · Sign in" -> /signin
// - When authenticated: "Signed in as {name}" -> /my-account/dashboard

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SessionBadge({ fixed = true }) {
  const user = useSelector((s) => s?.auth?.user);
  const isGuest = !user;

  const containerClass = fixed ? 'fixed bottom-4 right-4 z-30' : 'inline-block';

  const pillClass = [
    'rounded-full',
    'px-3',
    'py-1',
    'text-sm',
    'font-medium',
    'shadow',
    'transition-colors',
    'duration-150',
    isGuest
      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
  ].join(' ');

  return (
    <div className={containerClass} aria-live="polite" aria-atomic="true">
      {isGuest ? (
        <Link to="/signin" className={pillClass} title="Sign in">
          <span className="hidden sm:inline">Guest · </span>Sign in
        </Link>
      ) : (
        <Link
          to="/my-account/dashboard"
          className={pillClass}
          title="Go to My Account"
        >
          <span className="hidden sm:inline">Signed in as </span>
          {user?.name || user?.email || 'User'}
        </Link>
      )}
    </div>
  );
}
