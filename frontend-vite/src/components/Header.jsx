import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutServer, logoutLocal } from '@/redux/slices/authSlice';
import { setQuery } from '@/redux/slices/searchSlice';
import SearchSuggest from '@/components/SearchSuggest';

/**
 * Header (lint-fix for hooks + unused catch var)
 */
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((s) => s.auth || {});

  // One unconditional selector to avoid hook-order issues
  const cartItems = useSelector(
    (s) => s.cart?.items ?? s.cart?.cartItems ?? []
  );
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((acc, it) => acc + (Number(it?.qty) || 1), 0)
    : 0;

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileQ, setMobileQ] = useState('');
  const menuRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  // ESC + click-outside close
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeMenu();
    const onClick = (e) => {
      if (!menuOpen) return;
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [menuOpen]);

  const onSignOut = async () => {
    try {
      await dispatch(logoutServer()).unwrap();
    } catch {
      /* ignore server error */
    } finally {
      dispatch(logoutLocal());
      closeMenu();
      navigate('/');
    }
  };

  const onMobileSearch = (e) => {
    e.preventDefault();
    const q = (mobileQ || '').trim();
    if (!q) return;
    dispatch(setQuery(q));
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Brand */}
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Jalisco Tile
        </Link>

        {/* Desktop search */}
        <div className="hidden md:block flex-1 max-w-2xl">
          <SearchSuggest />
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative inline-flex items-center justify-center rounded-xl px-3 py-2 border hover:bg-gray-50"
            aria-label={`Cart with ${cartCount} item${
              cartCount === 1 ? '' : 's'
            }`}
          >
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-black text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {!userInfo ? (
            <Link
              to="/check-email"
              className="inline-flex items-center rounded-xl px-3 py-2 bg-black text-white hover:bg-gray-800"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="inline-flex items-center rounded-xl px-3 py-2 border hover:bg-gray-50"
              >
                My Account
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg p-1"
                >
                  <Link
                    role="menuitem"
                    to="/my-account/dashboard"
                    onClick={closeMenu}
                    className="block px-3 py-2 rounded hover:bg-gray-100"
                  >
                    Account Home
                  </Link>
                  <button
                    role="menuitem"
                    onClick={onSignOut}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <form onSubmit={onMobileSearch} className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search products…"
            className="flex-1 border rounded-lg px-3 py-2"
            value={mobileQ}
            onChange={(e) => setMobileQ(e.target.value)}
            aria-label="Search products"
          />
          <button className="rounded-lg px-3 py-2 border hover:bg-gray-50">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
