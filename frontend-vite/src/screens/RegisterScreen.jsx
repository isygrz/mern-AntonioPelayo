import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import Message from '../components/Message';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setChecking(true);
    setError(null);

    try {
      const { data } = await axios.post('/api/users/check-email', { email });

      if (data.exists) {
        navigate(`/signin?email=${email}`);
      } else {
        navigate(`/select-account-type?email=${email}`);
      }
    } catch {
      setError('Email check failed. Please try again.');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      {error && <Message variant="danger">{error}</Message>}
      {checking && <Loader />}
      <form onSubmit={handleCheckEmail} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-accent w-full">
          Continue
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
