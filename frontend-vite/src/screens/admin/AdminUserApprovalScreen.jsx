import { useEffect, useState } from 'react';
import axios from '@/utils/axiosInstance';
import toast from 'react-hot-toast';
import log from '@/utils/logger';

/**
 * AdminUserApprovalScreen (defensive shell)
 * Attempts to fetch pending vendor requests from /users/pending.
 * Shows loading/empty/error states so the route never renders blank.
 */
export default function AdminUserApprovalScreen() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios
      .get('/users/pending')
      .then(({ data }) => {
        if (!mounted) return;
        setRows(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(err);
        toast.error('Failed to load pending users');
        log.error('[Approvals] fetch error', err);
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-4">Loading pending users…</div>;
  if (error)
    return (
      <div className="p-4 text-red-600">Could not load pending users.</div>
    );
  if (!rows.length) return <div className="p-4">No pending approvals 🎉</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-3">Pending Approvals</h1>
      <div className="rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="[&>th]:px-3 [&>th]:py-2 text-left">
              <th>Email</th>
              <th>Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="[&>td]:px-3 [&>td]:py-2 border-t">
                <td>{r.email}</td>
                <td>{new Date(r.createdAt || Date.now()).toLocaleString()}</td>
                <td>
                  <button className="px-2 py-1 text-xs rounded border mr-2 hover:bg-gray-50">
                    Approve
                  </button>
                  <button className="px-2 py-1 text-xs rounded border hover:bg-gray-50">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
