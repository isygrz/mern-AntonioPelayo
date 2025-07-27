import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginUser } from '@/redux/slices/authSlice';
import { toast } from 'react-hot-toast';

const SignInScreenSmart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefilledEmail = searchParams.get('email') || '';

  const [email] = useState(prefilledEmail);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!prefilledEmail) {
      toast.error('Missing email. Redirecting to check email screen...');
      navigate('/check-email');
    }
  }, [prefilledEmail, navigate]);

  useEffect(() => {
    if (userInfo) {
      toast.success(`Welcome back, ${userInfo.name || 'user'}!`);
      navigate('/account');
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    try {
      setSubmitting(true);
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      toast.error(err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
      <p className="text-center text-sm text-gray-500 mb-4">
        Signing in as{' '}
        <span className="font-semibold text-gray-700">{email}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={submitting || loading}
          className="w-full py-2 bg-black text-white font-semibold rounded hover:bg-gray-800"
        >
          {submitting ? 'Signing In…' : 'Sign In'}
        </button>
      </form>

      {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
    </div>
  );
};

export default SignInScreenSmart;
