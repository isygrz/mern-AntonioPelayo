import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // [{ id, name, slug, price, image, qty }]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const exist = state.cartItems.find((x) => x.slug === item.slug);
      if (exist) {
        state.cartItems = state.cartItems.map((x) =>
          x.slug === item.slug ? { ...x, qty: item.qty } : x
        );
      } else {
        state.cartItems.push(item);
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (x) => x.slug !== action.payload
      );
    },
    updateQty(state, action) {
      const { slug, qty } = action.payload;
      state.cartItems = state.cartItems.map((x) =>
        x.slug === slug ? { ...x, qty } : x
      );
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
