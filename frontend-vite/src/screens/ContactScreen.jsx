import { useState } from 'react';
import axios from '@/utils/axiosInstance';

/**
 * Public Contact screen (no auth required)
 * Uses POST /api/inbox/public
 */
const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await axios.post('/api/inbox/public', { name, email, subject, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || 'Submission failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2">Contact Us</h1>
      <p className="text-sm text-gray-600 mb-6">We’ll get back to you soon.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Subject</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[160px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}
        {success && (
          <div className="text-sm text-green-700">
            Thanks! Your message has been sent.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-800 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactScreen;
