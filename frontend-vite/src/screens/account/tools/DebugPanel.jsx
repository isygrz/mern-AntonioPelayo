import log from '@/utils/logger';
import { useSelector } from 'react-redux';
import axios from '@/utils/axiosInstance';
import { useState } from 'react';
import { useToast } from '@/components/ui/useToast';

/**
 * DebugPanel
 * - Logs Redux state
 * - Auth status check
 * - Inbox smoke tests (health, public, account)
 *   NOTE: Keep this page behind /my-account/debug and role-protect in production.
 */
export default function DebugPanel() {
  const state = useSelector((s) => s);
  const toast = useToast();

  const [publicForm, setPublicForm] = useState({
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    subject: 'Hello from public form',
    message: 'This is a public test message from DebugPanel.',
  });

  const [accountForm, setAccountForm] = useState({
    subject: 'Hello from account',
    message: 'This is an authenticated test message from DebugPanel.',
  });

  const logRedux = () => {
    log.debug('[Redux State]', state);
    toast.success('Redux state logged to console');
  };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/users/profile');
      toast.success(`Authed as ${data?.email || 'unknown'}`);
      log.debug('[Auth profile]', data);
    } catch (err) {
      toast.error('Not authenticated');
      log.error('[Auth profile error]', err);
    }
  };

  const pingInboxHealth = async () => {
    try {
      const { data } = await axios.get('/inbox/health');
      toast.success('Inbox health OK');
      log.debug('[Inbox health]', data);
    } catch (err) {
      toast.error('Inbox health failed');
      log.error('[Inbox health error]', err);
    }
  };

  const sendPublicTest = async () => {
    try {
      const { data } = await axios.post('/inbox/public', publicForm);
      toast.success(`Public message sent (#${data?.id || 'ok'})`);
      log.debug('[Public inbox result]', data);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Public message failed';
      toast.error(msg);
      log.error('[Public inbox error]', err);
    }
  };

  const sendAccountTest = async () => {
    try {
      const { data } = await axios.post('/inbox', accountForm);
      toast.success(`Account message sent (#${data?.id || 'ok'})`);
      log.debug('[Account inbox result]', data);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Account message failed';
      toast.error(msg);
      log.error('[Account inbox error]', err);
    }
  };

  return (
    <div className="p-4 rounded-xl border bg-white space-y-6">
      <h1 className="text-xl font-semibold">Debug Panel</h1>

      {/* Basic tools */}
      <div className="flex gap-2">
        <button
          onClick={logRedux}
          className="px-3 py-2 rounded border hover:bg-gray-50"
        >
          Log Redux State
        </button>
        <button
          onClick={checkAuth}
          className="px-3 py-2 rounded border hover:bg-gray-50"
        >
          Run Auth Status Check
        </button>
      </div>

      {/* Inbox smoke tests */}
      <section className="space-y-4">
        <h2 className="font-semibold">Inbox Smoke Tests</h2>
        <div className="flex gap-2">
          <button
            onClick={pingInboxHealth}
            className="px-3 py-2 rounded border hover:bg-gray-50"
          >
            Ping /api/inbox/health
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Public form */}
          <div className="p-3 rounded border">
            <h3 className="font-medium mb-2">Public Message</h3>
            <div className="grid gap-2">
              <input
                className="border rounded px-3 py-2"
                placeholder="Name"
                value={publicForm.name}
                onChange={(e) =>
                  setPublicForm({ ...publicForm, name: e.target.value })
                }
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Email"
                value={publicForm.email}
                onChange={(e) =>
                  setPublicForm({ ...publicForm, email: e.target.value })
                }
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Subject (optional)"
                value={publicForm.subject}
                onChange={(e) =>
                  setPublicForm({ ...publicForm, subject: e.target.value })
                }
              />
              <textarea
                className="border rounded px-3 py-2"
                placeholder="Message"
                rows={4}
                value={publicForm.message}
                onChange={(e) =>
                  setPublicForm({ ...publicForm, message: e.target.value })
                }
              />
              <button
                onClick={sendPublicTest}
                className="px-3 py-2 rounded bg-black text-white hover:bg-gray-800"
              >
                Send Public Message
              </button>
            </div>
          </div>

          {/* Account form */}
          <div className="p-3 rounded border">
            <h3 className="font-medium mb-2">Authenticated Message</h3>
            <div className="grid gap-2">
              <input
                className="border rounded px-3 py-2"
                placeholder="Subject (optional)"
                value={accountForm.subject}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, subject: e.target.value })
                }
              />
              <textarea
                className="border rounded px-3 py-2"
                placeholder="Message"
                rows={4}
                value={accountForm.message}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, message: e.target.value })
                }
              />
              <button
                onClick={sendAccountTest}
                className="px-3 py-2 rounded bg-black text-white hover:bg-gray-800"
              >
                Send Account Message
              </button>
              <p className="text-xs text-gray-500">
                Requires authentication (cookie-based).
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="text-sm text-gray-600">
        Open your browser console to see detailed request/response payloads.
      </p>
    </div>
  );
}
