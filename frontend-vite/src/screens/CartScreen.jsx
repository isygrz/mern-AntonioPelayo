import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQty } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleQtyChange = (slug, qty) => {
    dispatch(updateQty({ slug, qty }));
  };

  const handleRemove = (slug) => {
    dispatch(removeFromCart(slug));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-4 bg-white p-4 shadow rounded"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <Link
                  to={`/product/${item.slug}`}
                  className="font-medium text-slate-800 hover:underline"
                >
                  {item.name}
                </Link>
                <div className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} per box
                </div>
              </div>
              <input
                type="number"
                min="1"
                value={item.qty}
                onChange={(e) =>
                  handleQtyChange(item.slug, Number(e.target.value))
                }
                className="w-16 text-center border rounded px-2 py-1"
              />
              <button
                onClick={() => handleRemove(item.slug)}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button className="mt-2 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
