import log from '@/utils/logger';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';
import './index.css';

// ✅ Optional: Expose for DevTools
import { fetchAllProducts } from './redux/slices/productSlice.js';
import { fetchAllBlogs } from './redux/slices/blogSlice.js';
import { updateCmsLayout } from './redux/slices/cmsSlice.js';

// ✅ Moved to its own file
import ErrorBoundary from './components/ErrorBoundary.jsx';

// ✅ Toasts
import ToastProvider from '@/components/ui/ToastProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <ToastProvider position="top-right">
            <App />
          </ToastProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// ✅ DEV ONLY: Expose Redux store and thunks
if (import.meta.env.MODE === 'development' && typeof window !== 'undefined') {
  window.store = store;
  window.fetchAllProducts = fetchAllProducts;
  window.fetchAllBlogs = fetchAllBlogs;
  window.updateCmsLayout = updateCmsLayout;
  log.debug('🧪 Redux store and thunks exposed on window');
}
