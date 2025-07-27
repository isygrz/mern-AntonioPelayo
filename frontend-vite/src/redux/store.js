import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import productDetailsReducer from './slices/productDetailsSlice'; // ✅ Product details by slug
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import blogReducer from './slices/blogSlice';
import badgeReducer from './slices/badgeSlice';
import heroReducer from './slices/heroSlice';
import cmsReducer from './slices/cmsSlice';
import footerReducer from './slices/footerSlice'; // ✅ Footer CMS slice
import usersReducer from './slices/userSlice'; // ✅ New user slice for admin tools

const store = configureStore({
  reducer: {
    auth: authReducer, // User authentication
    products: productReducer, // Full product catalog and CRUD
    productDetails: productDetailsReducer, // ✅ Single product details via slug
    cart: cartReducer, // Guest/user cart state
    order: orderReducer, // Order creation and tracking
    blog: blogReducer, // Blog CMS (list + post)
    badge: badgeReducer, // Admin badge editor for product tagging
    hero: heroReducer, // Homepage hero CMS section
    cms: cmsReducer, // CMS layout config by route
    footer: footerReducer, // Footer CMS section data
    users: usersReducer, // ✅ Admin user approval tools
  },
});

export default store;
