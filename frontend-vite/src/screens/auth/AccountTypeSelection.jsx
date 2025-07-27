import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedRole } from '@/redux/slices/authSlice';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const AccountTypeSelection = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (!email) {
      toast.error('Email missing from URL. Please start over.');
      navigate('/start');
      return;
    }

    dispatch(setSelectedRole(role));

    const encodedEmail = encodeURIComponent(email);
    if (role === 'personal') {
      navigate(`/register/personal?email=${encodedEmail}`);
    } else if (role === 'vendor') {
      navigate(`/register/vendor?email=${encodedEmail}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Choose Your Account Type</h1>
      <div className="space-y-4 w-full max-w-xs">
        <Button className="w-full" onClick={() => handleRoleSelect('personal')}>
          👤 Personal Account
        </Button>
        <Button className="w-full" onClick={() => handleRoleSelect('vendor')}>
          🏪 Vendor Account
        </Button>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
