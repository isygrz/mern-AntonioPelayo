import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import blogReducer from './slices/blogSlice';
import badgesReducer from './slices/badgeSlice';
import heroesReducer from './slices/heroSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: orderReducer,
    blogs: blogReducer,
    badges: badgesReducer,
    heroes: heroesReducer,
  },
});

export default store;
