import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

export default function CheckoutScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const { loading, error, success } = useSelector((state) => state.order);

  const [form, setForm] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.pricePerBox,
        image: item.imageGallery?.[0] || '',
      })),
      shippingAddress: form,
      totalAmount: cartItems.reduce(
        (sum, item) => sum + item.pricePerBox * item.quantity,
        0
      ),
    };

    if (userInfo?.isGuest) {
      orderData.guestSessionId = userInfo.guestSessionId;
    }

    const resultAction = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(resultAction)) {
      navigate('/thank-you'); // ✅ You can define this route
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'fullName', label: 'Full Name' },
          { name: 'addressLine1', label: 'Address Line 1' },
          { name: 'addressLine2', label: 'Address Line 2' },
          { name: 'city', label: 'City' },
          { name: 'state', label: 'State' },
          { name: 'zipCode', label: 'Zip Code' },
          { name: 'phone', label: 'Phone' },
          { name: 'email', label: 'Email' },
        ].map(({ name, label }) => (
          <input
            key={name}
            type="text"
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={label}
            className="w-full border border-gray-300 p-2 rounded"
            required={name !== 'addressLine2'}
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mt-2">Order placed!</p>
        )}
      </form>
    </div>
  );
}
