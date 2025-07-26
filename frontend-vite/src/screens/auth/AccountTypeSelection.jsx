import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedRole } from '@/redux/slices/authSlice'; // Make sure this is in your slice
import { Button } from '@/components/ui/button'; // Or use plain button

const AccountTypeSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoleSelect = (role) => {
    dispatch(setSelectedRole(role));
    if (role === 'personal') {
      navigate('/register/personal');
    } else if (role === 'vendor') {
      navigate('/register/vendor');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-6">Choose Your Account Type</h1>
      <div className="space-y-4 w-full max-w-xs">
        <Button className="w-full" onClick={() => handleRoleSelect('personal')}>
          Personal Account
        </Button>
        <Button className="w-full" onClick={() => handleRoleSelect('vendor')}>
          Vendor Account
        </Button>
      </div>
    </div>
  );
};

export default AccountTypeSelection;
