import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
  listPendingUsers,
  approveUser,
  rejectUser,
} from '@/redux/slices/adminUserSlice';

export default function AdminUserApprovalScreen() {
  const dispatch = useDispatch();
  const { pending, loading, error } = useSelector((s) => s.adminUsers);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    dispatch(listPendingUsers({ page, pageSize }));
  }, [dispatch, page]);

  useEffect(() => {
    if (error) toast.error(String(error));
  }, [error]);

  const onApprove = async (id) => {
    try {
      await dispatch(approveUser(id)).unwrap();
      toast.success('User approved');
    } catch (e) {
      toast.error(e?.message || 'Approve failed');
    }
  };

  const onReject = async (id) => {
    try {
      await dispatch(rejectUser(id)).unwrap();
      toast.success('User rejected');
    } catch (e) {
      toast.error(e?.message || 'Reject failed');
    }
  };

  const rows = pending.items || [];
  const canPrev = page > 1;
  const canNext = page * pageSize < (pending.total || 0);

  return (
    <div className="max-w-5xl mx-auto mt-8 bg-white shadow-md rounded-2xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold">User Approvals</h2>
      </div>

      <div className="overflow-x-auto border rounded-2xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-3 py-2">Name</th>
              <th className="text-left px-3 py-2">Email</th>
              <th className="text-left px-3 py-2">Role</th>
              <th className="text-left px-3 py-2">Status</th>
              <th className="text-left px-3 py-2">Requested</th>
              <th className="text-right px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-3 py-2">{u.name || '—'}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.role || 'user'}</td>
                <td className="px-3 py-2">
                  {u.status || (u.approved ? 'approved' : 'pending')}
                </td>
                <td className="px-3 py-2">
                  {new Date(u.createdAt).toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => onApprove(u._id)}
                    className="text-green-700 underline mr-3 disabled:opacity-50"
                    disabled={loading}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(u._id)}
                    className="text-red-700 underline disabled:opacity-50"
                    disabled={loading}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && !loading && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                  No pending users.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600 mt-3">
        <div>Total: {pending.total || 0}</div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!canPrev || loading}
          >
            Prev
          </button>
          <span className="px-2">Page {page}</span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNext || loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
