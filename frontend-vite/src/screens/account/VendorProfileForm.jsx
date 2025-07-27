import { useState } from 'react';
import toast from 'react-hot-toast';

const VendorProfileForm = () => {
  const [form, setForm] = useState({
    companyName: '',
    website: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with Redux or axios POST later
      console.log('📡 Submitting Vendor Profile:', form);
      toast.success('Vendor profile saved');
    } catch (err) {
      console.error(err); // ✅ resolves ESLint warning
      toast.error('Failed to save profile');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow rounded space-y-4 mt-12"
    >
      <h2 className="text-xl font-bold">Vendor Contact & Social Info</h2>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={form.companyName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="website"
        placeholder="Website URL"
        value={form.website}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="whatsapp"
        placeholder="WhatsApp Number"
        value={form.whatsapp}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="instagram"
        placeholder="Instagram Profile"
        value={form.instagram}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="facebook"
        placeholder="Facebook Page"
        value={form.facebook}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Support Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="notes"
        placeholder="Optional Notes or Description"
        value={form.notes}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Save Profile
      </button>
    </form>
  );
};

export default VendorProfileForm;
