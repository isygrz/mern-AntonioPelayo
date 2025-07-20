import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store.js';
import './index.css';

// ✅ Import thunks you want to test
import { fetchAllProducts } from './redux/slices/productSlice.js';

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

  // 🧽 Optional: log once to confirm they're available
  console.log('🧪 Redux store and thunks exposed on window');
}
