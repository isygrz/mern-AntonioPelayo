import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchVendorProfile,
  saveVendorProfile,
} from '@/redux/slices/vendorProfileSlice';
import toast from 'react-hot-toast';

const VendorProfileForm = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.vendorProfile);

  const [form, setForm] = useState({
    businessName: '',
    website: '',
    contactEmail: '',
    contactPhone: '',
    location: '',
    bio: '',
    logoUrl: '',
    social: {
      facebook: '',
      instagram: '',
      whatsapp: '',
      tiktok: '',
      telegram: '',
    },
  });

  useEffect(() => {
    dispatch(fetchVendorProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setForm(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in form.social) {
      setForm((prev) => ({
        ...prev,
        social: { ...prev.social, [name]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(saveVendorProfile(form)).unwrap();
      toast.success('Profile saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save profile.');
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
        name="businessName"
        placeholder="Business Name"
        value={form.businessName}
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
        type="email"
        name="contactEmail"
        placeholder="Support Email"
        value={form.contactEmail}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="tel"
        name="contactPhone"
        placeholder="Phone Number"
        value={form.contactPhone}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="bio"
        placeholder="Short Bio or Description"
        value={form.bio}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="logoUrl"
        placeholder="Logo URL"
        value={form.logoUrl}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <h3 className="font-semibold mt-4">Social Links</h3>
      <input
        type="text"
        name="facebook"
        placeholder="Facebook Page"
        value={form.social.facebook}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="instagram"
        placeholder="Instagram Profile"
        value={form.social.instagram}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="whatsapp"
        placeholder="WhatsApp Number"
        value={form.social.whatsapp}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="tiktok"
        placeholder="TikTok Handle"
        value={form.social.tiktok}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="telegram"
        placeholder="Telegram Link"
        value={form.social.telegram}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
};

export default VendorProfileForm;
