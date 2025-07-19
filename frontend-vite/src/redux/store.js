import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import blogReducer from './slices/blogSlice';
import badgeReducer from './slices/badgeSlice';
import heroReducer from './slices/heroSlice';
import cmsReducer from './slices/cmsSlice';
import footerReducer from './slices/footerSlice'; // ✅ Footer CMS slice

const store = configureStore({
  reducer: {
    auth: authReducer, // User authentication (JWT + guest sessions)
    products: productReducer, // Full product catalog and CRUD
    cart: cartReducer, // Guest/user cart state
    order: orderReducer, // Order creation and tracking
    blog: blogReducer, // Blog CMS (list + post)
    badge: badgeReducer, // Admin badge editor for product tagging
    hero: heroReducer, // Homepage hero CMS section
    cms: cmsReducer, // CMS layout config by route
    footer: footerReducer, // Footer CMS section data
  },
});

export default store;
