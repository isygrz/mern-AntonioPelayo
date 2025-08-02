import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MailCheck } from 'lucide-react';
import { checkEmailStatus } from '@/redux';
import PageWrapper from '../../layouts/PageWrapper';

const EmailCheckScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const resultAction = await dispatch(checkEmailStatus(email));
      const { exists } = resultAction.payload;
      if (exists) {
        navigate(`/signin?email=${encodeURIComponent(email)}`);
      } else {
        navigate(`/register/select?email=${encodeURIComponent(email)}`);
      }
    } catch {
      setError('Unable to check email. Please try again.');
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
              className="w-full bg-black text-white font-semibold py-2 rounded-md hover:bg-gray-800 transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EmailCheckScreen;
