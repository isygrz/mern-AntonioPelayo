import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Screens
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';

// Blog
import BlogListScreen from './screens/BlogListScreen.jsx';
import BlogPostScreen from './screens/BlogPostScreen.jsx';

// Auth
import EmailCheckScreen from './screens/auth/EmailCheckScreen.jsx';
import AccountTypeSelection from './screens/AccountTypeSelection.jsx';
import SignInScreen from './screens/SignInScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PersonalRegisterScreen from './screens/PersonalRegisterScreen.jsx';
import VendorRegisterScreen from './screens/VendorRegisterScreen.jsx';

// Account
import AccountScreen from './screens/AccountScreen.jsx';
import NotAuthorizedScreen from './screens/NotAuthorizedScreen.jsx';

// Admin
import AdminLayout from './layouts/AdminLayout.jsx';
import AdminDashboard from './screens/admin/AdminDashboard.jsx';
import HeroManager from './screens/admin/HeroManager.jsx';
import BlogManager from './screens/admin/BlogManager.jsx';
import BadgeManager from './screens/admin/BadgeManager.jsx';
import SettingsManager from './screens/admin/SettingsManager.jsx';
import ProductManager from './screens/admin/ProductManager.jsx';
import AdminUserApprovalScreen from './screens/admin/AdminUserApprovalScreen.jsx';

// My Account (nested tools)
import AccountLayout from './layouts/AccountLayout.jsx';
import DebugPanel from './screens/account/tools/DebugPanel.jsx';
import InventoryPanel from './screens/account/tools/InventoryPanel.jsx';
import MobileSessionLauncher from './screens/account/tools/MobileSessionLauncher.jsx';

// Route Guards
import ProtectedRoute from './components/routing/ProtectedRoute.jsx';
import AdminRoute from './components/routing/AdminRoute.jsx';

// Layout
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="container mx-auto px-4">
      <Header />

      <main>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/blog" element={<BlogListScreen />} />
          <Route path="/blog/:slug" element={<BlogPostScreen />} />

          {/* Auth Flow */}
          <Route path="/check-email" element={<EmailCheckScreen />} />
          <Route
            path="/select-account-type"
            element={<AccountTypeSelection />}
          />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route
            path="/register/personal"
            element={<PersonalRegisterScreen />}
          />
          <Route path="/register/vendor" element={<VendorRegisterScreen />} />

          {/* Protected Account Area */}
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AccountScreen />} />
            <Route path="orders" element={<div>Orders (TODO)</div>} />
            <Route path="wishlist" element={<div>Wishlist (TODO)</div>} />
            <Route
              path="inventory"
              element={
                <AdminRoute>
                  <InventoryPanel />
                </AdminRoute>
              }
            />
            <Route
              path="mobile-tools"
              element={
                <AdminRoute>
                  <MobileSessionLauncher />
                </AdminRoute>
              }
            />
            <Route
              path="approvals"
              element={
                <AdminRoute>
                  <AdminUserApprovalScreen />
                </AdminRoute>
              }
            />
            <Route path="cms" element={<div>CMS Editor (TODO)</div>} />
            <Route
              path="debug"
              element={
                <AdminRoute>
                  <DebugPanel />
                </AdminRoute>
              }
            />
          </Route>

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="heroes" element={<HeroManager />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="badges" element={<BadgeManager />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="products" element={<ProductManager />} />
            <Route
              path="user-approvals"
              element={<AdminUserApprovalScreen />}
            />
          </Route>

          {/* Fallback */}
          <Route path="/not-authorized" element={<NotAuthorizedScreen />} />
        </Routes>
      </main>

      <Footer />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
