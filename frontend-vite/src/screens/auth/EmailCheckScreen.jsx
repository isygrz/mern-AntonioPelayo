import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const EmailCheckScreen = () => {
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      setChecking(true);
      const { data } = await axios.get(
        `/api/users/check-email?email=${encodeURIComponent(email)}`
      );
      if (data.exists) {
        navigate(`/signin?email=${encodeURIComponent(email)}`);
      } else {
        navigate(`/register/account-type?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      console.error('❌ Email check failed:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Let's Get Started</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          className="border border-gray-300 p-2 w-full rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
          disabled={checking}
        >
          {checking ? 'Checking...' : 'Continue'}
        </button>
      </form>
    </div>
  );
};

export default EmailCheckScreen;
