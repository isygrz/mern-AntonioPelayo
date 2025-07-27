import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkEmailStatus } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';

const EmailCheckScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter an email.');

    try {
      const resultAction = await dispatch(checkEmailStatus(email));

      if (checkEmailStatus.fulfilled.match(resultAction)) {
        const { exists } = resultAction.payload;

        if (exists) {
          navigate(`/signin?email=${encodeURIComponent(email)}`);
        } else {
          navigate(
            `/account-type-selection?email=${encodeURIComponent(email)}`
          );
        }
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error('❌ Email check failed:', err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Sign In or Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          className="w-full p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white w-full p-2 rounded"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default EmailCheckScreen;
