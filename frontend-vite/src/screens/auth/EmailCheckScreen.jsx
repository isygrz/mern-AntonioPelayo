import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import axios from '@/utils/axiosInstance';
import PageWrapper from '../../layouts/PageWrapper';

/**
 * EmailCheckScreen (VITE_API_BASE-aware)
 * - axiosInstance uses import.meta.env.VITE_API_BASE which already contains '/api'
 * - Calls are relative (no '/api' prefix here).
 * - Handles { exists, role, approved | isApproved } with vendor approval branch.
 */
const EmailCheckScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await axios.post('/users/check-email', { email });
      const exists = !!data?.exists;
      const role = data?.role || 'personal';
      // Support both keys: 'approved' (server) and 'isApproved' (older clients)
      const isApproved =
        typeof data?.approved === 'boolean'
          ? data.approved
          : !!data?.isApproved;

      if (exists) {
        // If vendor exists but not approved yet, route to the waiting screen (project standard)
        if (role === 'vendor' && isApproved === false) {
          navigate('/thank-you-awaiting-approval');
          return;
        }
        // Otherwise continue to sign in with email prefilled
        navigate(`/signin?email=${encodeURIComponent(email)}`);
      } else {
        // New user → choose account type
        navigate(`/register/account-type?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Unable to check email. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex flex-col items-center justify-center gap-3 mb-6">
            <MailCheck className="h-10 w-10 text-black" />
            <h1 className="text-2xl font-bold">Let’s Find Your Account</h1>
            <p className="text-gray-600 text-sm text-center">
              Enter your email to continue to sign in or create a new account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? 'Checking…' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EmailCheckScreen;
