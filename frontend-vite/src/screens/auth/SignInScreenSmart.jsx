import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux';
import { useLocation, useNavigate } from 'react-router-dom';

const SignInScreenSmart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    new URLSearchParams(location.search).get('email') || ''
  );
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { userInfo, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate('/account');
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full px-4 py-2 border rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              className="w-full px-4 py-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-sm text-gray-600"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInScreenSmart;
