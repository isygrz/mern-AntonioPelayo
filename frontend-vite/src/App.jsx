import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import SearchResultsScreen from './screens/SearchResultsScreen.jsx';
import ContactScreen from './screens/ContactScreen.jsx';

import BlogListScreen from './screens/BlogListScreen.jsx';
import BlogPostScreen from './screens/BlogPostScreen.jsx';

import EmailCheckScreen from './screens/auth/EmailCheckScreen.jsx';
import AccountTypeSelection from './screens/AccountTypeSelection.jsx';
import SignInScreenSmart from './screens/auth/SignInScreenSmart';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PersonalRegisterScreen from './screens/PersonalRegisterScreen.jsx';
import VendorRegisterScreen from './screens/VendorRegisterScreen.jsx';

import ThankYouAwaitingApproval from './screens/ThankYouAwaitingApproval.jsx';

import AccountScreen from './screens/AccountScreen.jsx';
import VendorProfileForm from './screens/account/VendorProfileForm.jsx';
import AccountLayout from './layouts/AccountLayout.jsx';

import ProductManager from './screens/admin/ProductManager.jsx';
import BlogManager from './screens/admin/BlogManager.jsx';
import HeroManager from './screens/admin/HeroManager.jsx';
import BadgeManager from './screens/admin/BadgeManager.jsx';
import SettingsManager from './screens/admin/SettingsManager.jsx';
import UploadsManager from './screens/admin/UploadsManager.jsx';
import AdminUserApprovalScreen from './screens/account/tools/AdminUserApprovalScreen.jsx';
import FooterManager from './screens/admin/FooterManager.jsx';

import DebugPanel from '@/components/admin/DebugPanel.jsx';
import InventoryPanel from './screens/account/tools/InventoryPanel.jsx';
import MobileSessionLauncher from './screens/account/tools/MobileSessionLauncher.jsx';

import ProtectedRoute from './components/routing/ProtectedRoute.jsx';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AuthBootstrap from './components/AuthBootstrap.jsx';

import OfflineProvider from '@/contexts/OfflineProvider.jsx';
import OfflineBanner from '@/components/common/OfflineBanner.jsx';

import NotFoundScreen from './screens/NotFoundScreen.jsx';

function AdminAliasRedirect() {
  const { pathname, search } = useLocation();
  const target = pathname.startsWith('/admin')
    ? '/my-account' + pathname.slice('/admin'.length)
    : pathname;
  return <Navigate to={target + (search || '')} replace />;
}

export default function App() {
  useEffect(() => {
    // Footer fetched via useFooter() inside Footer.jsx
  }, []);

  return (
    <OfflineProvider>
      <div className="min-h-screen flex flex-col">
        <OfflineBanner />

        <Header />
        <AuthBootstrap />

        <main className="flex-grow container mx-auto px-4">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchResultsScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/blog" element={<BlogListScreen />} />
            <Route path="/blog/:slug" element={<BlogPostScreen />} />

            <Route
              path="/account"
              element={<Navigate to="/my-account/dashboard" replace />}
            />

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
            <Route
              path="/thank-you-awaiting-approval"
              element={<ThankYouAwaitingApproval />}
            />

            <Route element={<ProtectedRoute />}>
              <Route path="/my-account" element={<AccountLayout />}>
                <Route path="dashboard" element={<AccountScreen />} />
                <Route path="orders" element={<div>Orders (TODO)</div>} />
                <Route path="wishlist" element={<div>Wishlist (TODO)</div>} />

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
                  <Route path="settings/footer" element={<FooterManager />} />
                </Route>
              </Route>
            </Route>

            <Route path="/admin/*" element={<AdminAliasRedirect />} />
            <Route path="/not-authorized" element={<NotFoundScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </div>
    </OfflineProvider>
  );
}
