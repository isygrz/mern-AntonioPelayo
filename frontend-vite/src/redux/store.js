import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import blogReducer from './slices/blogSlice';
import badgeReducer from './slices/badgeSlice';
import heroReducer from './slices/heroSlice';
import cmsReducer from './slices/cmsSlice';
import footerReducer from './slices/footerSlice';
import usersReducer from './slices/userSlice';
import vendorProfileReducer from './slices/vendorProfileSlice'; // ✅ New vendor profile slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    order: orderReducer,
    blog: blogReducer,
    badge: badgeReducer,
    hero: heroReducer,
    cms: cmsReducer,
    footer: footerReducer,
    users: usersReducer,
    vendorProfile: vendorProfileReducer, // ✅ Registered slice
  },
});

export default store;
