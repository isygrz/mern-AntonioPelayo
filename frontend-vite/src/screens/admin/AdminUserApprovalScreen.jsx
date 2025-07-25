import React from 'react';
import UserApprovalManager from '../../components/admin/UserApprovalManager';

const AdminUserApprovalScreen = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Vendor User Approvals</h1>
      <UserApprovalManager />
    </div>
  );
};

export default AdminUserApprovalScreen;
