import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';

const EmailCheckScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheck = async () => {
    try {
      const { data } = await axios.get(`/api/users/check-email?email=${email}`);
      if (data.exists) {
        navigate(`/signin?email=${email}`);
      } else {
        navigate(`/register/account-type?email=${email}`);
      }
    } catch (err) {
      console.error('Email check failed:', err); // Dev log
      setError('Error checking email');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Let's Get Started</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        className="border p-2 w-full mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleCheck} className="bg-black text-white px-4 py-2">
        Continue
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default EmailCheckScreen;
