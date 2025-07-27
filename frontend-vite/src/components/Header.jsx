import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/slices/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      <header className="p-4 bg-gray-100 shadow-md mb-6 flex justify-between items-center relative z-50">
        <Link to="/" className="text-2xl font-bold font-sans text-slate-gray">
          Jalisco Tile
        </Link>

        <nav className="flex gap-4 items-center text-sm relative z-50">
          {!userInfo ? (
            <Link
              to="/check-email"
              className="bg-slate-200 text-slate-800 px-3 py-1 rounded hover:bg-slate-300"
            >
              Sign In
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="bg-slate-200 text-slate-800 px-3 py-1 rounded hover:bg-slate-300"
              >
                My Account
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/my-account/dashboard');
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Account Home
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <Link
            to="/cart"
            className="bg-slate-800 text-white px-3 py-1 rounded hover:bg-black"
          >
            View Cart
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
