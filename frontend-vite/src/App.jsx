import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

// Redux
import { fetchFooter } from '@/redux/slices/footerSlice';

// Screens
import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import SearchResultsScreen from './screens/SearchResultsScreen.jsx';
import ContactScreen from './screens/ContactScreen.jsx';

// Blog
import BlogListScreen from './screens/BlogListScreen.jsx';
import BlogPostScreen from './screens/BlogPostScreen.jsx';

// Auth
import EmailCheckScreen from './screens/auth/EmailCheckScreen.jsx';
import AccountTypeSelection from './screens/AccountTypeSelection.jsx';
import SignInScreenSmart from './screens/auth/SignInScreenSmart';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PersonalRegisterScreen from './screens/PersonalRegisterScreen.jsx';
import VendorRegisterScreen from './screens/VendorRegisterScreen.jsx';

// Post-registration
import ThankYouAwaitingApproval from './screens/ThankYouAwaitingApproval.jsx';

// Account
import AccountScreen from './screens/AccountScreen.jsx';
import NotAuthorizedScreen from './screens/NotAuthorizedScreen.jsx';
import VendorProfileForm from './screens/account/VendorProfileForm.jsx';
import AccountLayout from './layouts/AccountLayout.jsx';

// Admin tools (now inside /my-account/*)
import ProductManager from './screens/admin/ProductManager.jsx';
import BlogManager from './screens/admin/BlogManager.jsx';
import HeroManager from './screens/admin/HeroManager.jsx';
import BadgeManager from './screens/admin/BadgeManager.jsx';
import SettingsManager from './screens/admin/SettingsManager.jsx';
import UploadsManager from './screens/admin/UploadsManager.jsx';
import AdminUserApprovalScreen from './screens/admin/AdminUserApprovalScreen.jsx';
// ✨ FooterManager
import FooterManager from './screens/admin/FooterManager.jsx';

// Account tools
import DebugPanel from './screens/account/tools/DebugPanel.jsx';
import InventoryPanel from './screens/account/tools/InventoryPanel.jsx';
import MobileSessionLauncher from './screens/account/tools/MobileSessionLauncher.jsx';

// Unified Guard
import ProtectedRoute from './components/routing/ProtectedRoute.jsx';

// Layout
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AuthBootstrap from './components/AuthBootstrap.jsx';

// Offline provider + banner
import OfflineProvider from '@/offline/OfflineProvider';
import OfflineBanner from '@/components/OfflineBanner';

// Back-compat helper: redirect /admin/* -> /my-account/*
function AdminAliasRedirect() {
  const { pathname, search } = useLocation();
  const target = pathname.replace(/^\/admin/, '/my-account') + (search || '');
  return <Navigate to={target} replace />;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFooter());
  }, [dispatch]);

  return (
    <OfflineProvider>
      <div className="min-h-screen flex flex-col">
        {/* Slim banner appears when offline or using cached snapshots */}
        <OfflineBanner />

        <Header />
        <AuthBootstrap />

        <main className="flex-grow container mx-auto px-4">
          <Routes>
            {/* Public */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchResultsScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/blog" element={<BlogListScreen />} />
            <Route path="/blog/:slug" element={<BlogPostScreen />} />

            {/* Back-compat: old /account -> new dashboard */}
            <Route
              path="/account"
              element={<Navigate to="/my-account/dashboard" replace />}
            />

            {/* Auth Flow */}
            <Route path="/check-email" element={<EmailCheckScreen />} />
            <Route path="/signin" element={<SignInScreenSmart />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route
              path="/register/personal"
              element={<PersonalRegisterScreen />}
            />
            <Route path="/register/vendor" element={<VendorRegisterScreen />} />
            <Route
              path="/register/account-type"
              element={<AccountTypeSelection />}
            />

            {/* Post-Registration Vendor Message */}
            <Route
              path="/thank-you-awaiting-approval"
              element={<ThankYouAwaitingApproval />}
            />

            {/* Protected Account Area */}
            <Route element={<ProtectedRoute />}>
              <Route path="/my-account" element={<AccountLayout />}>
                <Route path="dashboard" element={<AccountScreen />} />
                <Route path="orders" element={<div>Orders (TODO)</div>} />
                <Route path="wishlist" element={<div>Wishlist (TODO)</div>} />

                {/* Vendor & Admin shared tools */}
                <Route
                  element={<ProtectedRoute requireRole={['admin', 'vendor']} />}
                >
                  <Route path="inventory" element={<InventoryPanel />} />
                  <Route
                    path="mobile-tools"
                    element={<MobileSessionLauncher />}
                  />
                  <Route path="profile" element={<VendorProfileForm />} />
                </Route>

                {/* Admin-only tools — ALL now in /my-account/* */}
                <Route element={<ProtectedRoute requireRole="admin" />}>
                  <Route
                    path="approvals"
                    element={<AdminUserApprovalScreen />}
                  />
                  <Route path="cms" element={<div>CMS Editor (TODO)</div>} />
                  <Route path="debug" element={<DebugPanel />} />

                  <Route path="products" element={<ProductManager />} />
                  <Route path="blogs" element={<BlogManager />} />
                  <Route path="heroes" element={<HeroManager />} />
                  <Route path="badges" element={<BadgeManager />} />
                  <Route path="settings" element={<SettingsManager />} />
                  <Route path="uploads" element={<UploadsManager />} />
                  {/* ✨ NEW: Admin Footer Manager */}
                  <Route path="settings/footer" element={<FooterManager />} />
                </Route>
              </Route>
            </Route>

            {/* Back-compat: /admin/* aliases to /my-account/* */}
            <Route path="/admin/*" element={<AdminAliasRedirect />} />

            {/* Fallback */}
            <Route path="/not-authorized" element={<NotAuthorizedScreen />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </OfflineProvider>
  );
}

export default App;
