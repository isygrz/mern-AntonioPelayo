import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ Import Toaster
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';

// Blog
import BlogListScreen from './screens/BlogListScreen.jsx';
import BlogPostScreen from './screens/BlogPostScreen.jsx';

// Admin
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './screens/admin/AdminDashboard.jsx';
import HeroManager from './screens/admin/HeroManager.jsx';
import BlogManager from './screens/admin/BlogManager.jsx';
import BadgeManager from './screens/admin/BadgeManager.jsx';
import SettingsManager from './screens/admin/SettingsManager.jsx';
import ProductManager from './screens/admin/ProductManager.jsx';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container mx-auto px-4">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/blog" element={<BlogListScreen />} />
          <Route path="/blog/:slug" element={<BlogPostScreen />} />

          {/* Admin Route Nesting */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="heroes" element={<HeroManager />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="badges" element={<BadgeManager />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="products" element={<ProductManager />} />
          </Route>
        </Routes>
      </main>

      <Footer />

      {/* ✅ Add global toaster */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
