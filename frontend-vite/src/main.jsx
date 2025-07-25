import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';
import './index.css';

// ✅ Import thunks for DevTools or optional DebugPanel
import { fetchAllProducts } from './redux/slices/productSlice.js';
import { fetchAllBlogs } from './redux/slices/blogSlice.js';
import { updateCmsLayout } from './redux/slices/cmsSlice.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// ✅ DEV ONLY: Expose Redux store and thunks for manual dispatch in browser
if (import.meta.env.MODE === 'development' && typeof window !== 'undefined') {
  window.store = store;
  window.fetchAllProducts = fetchAllProducts;
  window.fetchAllBlogs = fetchAllBlogs;
  window.updateCmsLayout = updateCmsLayout;

  console.log('🧪 Redux store and thunks exposed on window');
}
