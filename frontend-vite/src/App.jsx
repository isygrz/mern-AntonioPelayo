import { Routes, Route, Link } from 'react-router-dom';
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

function App() {
  return (
    <div className="container mx-auto px-4">
      {/* Site Header */}
      <header className="p-4 bg-gray-100 shadow-md mb-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-sans text-slate-gray">
          Jalisco Tile
        </Link>
        <nav className="flex gap-4 items-center text-sm">
          <Link to="/blog" className="hover:underline text-slate-700">
            Blog
          </Link>
          <Link
            to="/cart"
            className="bg-slate-800 text-white px-3 py-1 rounded hover:bg-black"
          >
            View Cart
          </Link>
        </nav>
      </header>

      {/* Main Routing */}
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
    </div>
  );
}

export default App;
