import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, approveVendor } from '../../redux/slices/userSlice';

const UserApprovalManager = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleApprove = (userId) => {
    dispatch(approveVendor(userId));
  };

  const pendingVendors = users?.filter(
    (user) => user.accountType === 'vendor' && !user.approved
  );

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Pending Vendor Approvals</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && pendingVendors?.length === 0 && (
        <p className="text-gray-600">No pending vendor accounts.</p>
      )}

      {!loading &&
        pendingVendors?.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <button
              onClick={() => handleApprove(user._id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Approve
            </button>
          </div>
        ))}
    </div>
  );
};

export default UserApprovalManager;
